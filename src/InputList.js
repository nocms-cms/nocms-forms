import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';
import uuid from 'uuid/v4';

class InputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      store: {},
      items: [],
      idMap: [],
    };

    this.addListItem = this.addListItem.bind(this);
    this.removeListItem = this.removeListItem.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.validate = this.validate.bind(this);
    this.createItem = this.createItem.bind(this);
    this.createItems = this.createItems.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.patchStore = this.patchStore.bind(this);
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      const store = stores.getStore(this.context.store);
      const field = store[this.props.name];
      let idMap;
      if (field) {
        let length = field.length || 0;
        if (field.idMap) {
          length = field.idMap.length;
        }
        this.setState({ idMap: field.idMap, length }, this.createItems);
        if (field.idMap) {
          idMap = field.idMap;
        }
      }
      this.patchStore(idMap);
    }
  }

  onAddClick(e) {
    e.preventDefault();
    const newId = uuid();
    const idMap = [...this.state.idMap, newId];

    this.setState({ idMap }, () => {
      const item = this.createItem(this.state.length);
      const items = [...this.state.items, item];
      this.setState({ items, length: this.state.length + 1 });

      this.patchStore(idMap);
    });
  }

  getValue() {
    const value = [];
    const store = this.state.store;
    Object.keys(store).forEach((field) => {
      if (store[field]) {
        value.push(store[field].getValue());
      }
    });
    return value;
  }

  patchStore(idMap) {
    const obj = {};
    obj[this.props.name] = {
      isValid: true,
      isValidated: false,
      validate: this.validate,
      getValue: this.getValue,
      idMap: idMap || [],
    };

    stores.patch(this.context.store, obj);
  }

  validate() {
    const store = this.state.store;

    return Object.keys(store).reduce((valid, field) => {
      if (store[field]) {
        return valid && store[field].validate();
      }
      return false;
    }, true);
  }

  handleStoreChange(formData) {
    let isValid = true;
    let isValidated = true;

    Object.values(formData).forEach((field) => {
      isValid = isValid && field.isValid;
      isValidated = isValidated && field.isValidated;
    });

    const value = {};

    value[this.props.name] = {
      isValid,
      isValidated,
      validate: this.validate,
      getValue: this.getValue,
    };

    stores.patch(this.context.store, value);
  }

  addListItem(storeName, getValue, validate) {
    const store = this.state.store;
    store[storeName] = { getValue, validate };

    this.setState({ store });
  }

  removeListItem(e, item) {
    e.preventDefault();

    const store = this.state.store;
    delete store[item.props.store];

    stores.clearStore(item.props.store);
    const idMap = this.state.idMap.filter((id) => { return !item.props.store.includes(id); });

    this.setState({ idMap, store }, () => {
      const items = this.state.items.filter((itm) => { return !item.props.store.includes(itm.key); });
      this.setState({ items, length: this.state.length - 1 });
    });

    this.patchStore(idMap);
  }

  createItem(index) {
    const {
      removeButtonText,
      showRemoveButton,
      removeButtonClassName,
    } = this.props;

    const item = React.cloneElement(this.props.of, {
      store: `${this.context.store}-${this.props.name}-${this.state.idMap[index]}`,
      addListItem: this.addListItem,
      removeListItem: this.removeListItem,
    });

    const component = (
      <div key={this.state.idMap[index]}>
        { item }
        {
          showRemoveButton &&
            <button
              className={removeButtonClassName}
              onClick={(e) => { return item.props.removeListItem(e, item); }}
            >
              {removeButtonText}
            </button>
        }
      </div>
    );
    return component;
  }

  createItems() {
    const items = [];

    for (let i = 0; i < this.state.length; i++) { // eslint-disable-line no-plusplus  
      const item = this.createItem(i);
      items.push(item);
    }

    this.setState({ items });
  }

  render() {
    const {
      addButtonText,
      addButtonClassName,
    } = this.props;

    return (
      <div>
        { this.state.items }
        <br />
        <button
          className={addButtonClassName}
          onClick={this.onAddClick}
        >{addButtonText}
        </button>
      </div>
    );
  }
}

InputList.propTypes = {
  name: PropTypes.string.isRequired,
  of: PropTypes.object.isRequired,
  addButtonClassName: PropTypes.string,
  addButtonText: PropTypes.string,
  removeButtonClassName: PropTypes.string,
  removeButtonText: PropTypes.string,
  showRemoveButton: PropTypes.bool,
};

InputList.defaultProps = {
  showRemoveButton: true,
  addButtonText: 'Legg til',
  removeButtonText: 'Fjern',
};

InputList.contextTypes = {
  store: PropTypes.string,
};

export default InputList;
