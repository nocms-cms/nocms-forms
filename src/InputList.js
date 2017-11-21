import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';

class InputList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      data: {},
    };

    this.add = this.add.bind(this);
    this.addListItem = this.addListItem.bind(this);
    this.remove = this.remove.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      const store = stores.getStore(this.context.store);
      this.setState({ length: store[this.props.name] ? store[this.props.name].length || 0 : 0 });

      const obj = {};
      obj[this.props.name] = {
        isValid: true,
        isValidated: false,
        validate: this.validate,
        getValue: this.getValue,
      };

      stores.patch(this.context.store, obj);
    }
  }

  getValue() {
    const value = [];
    const store = this.state.data;
    Object.keys(store).forEach((field) => {
      if (store[field]) {
        value.push(store[field].getValue());
      }
    });
    return value;
  }

  validate() {
    const store = this.state.data;

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
      getValue: () => { return this.getValue(); },
    };

    stores.patch(this.context.store, value);
  }

  add(e) {
    e.preventDefault();
    const { of } = this.props;

    const item = React.cloneElement(of, {
      store: `${of.props.name}-${this.state.items.length}`,
    });

    const items = [...this.state.items, item];
    this.setState({ items });
  }

  remove(e, item) {

  }

  addListItem(storeName, getValue, validate) {
    const data = this.state.data;
    data[storeName] = { getValue, validate };

    this.setState({ data });
  }

  render() {
    const { addButtonText, removeButtonText, showRemoveButton, addButtonClassName, removeButtonClassName } = this.props;
    const items = [];

    for (let i = 0; i < this.state.length; i++) { // eslint-disable-line no-plusplus
      const item = React.cloneElement(this.props.of, {
        store: `${this.context.store}-${this.props.name}-${i}`,
        addListItem: this.addListItem,
      });

      items.push(
        <div key={i}>
          { item }
          { showRemoveButton && <button className={removeButtonClassName} onClick={(e) => { return this.remove(e, item); }}>{removeButtonText}</button> }
        </div>,
      );
    }

    return (
      <div>
        { items }
        <br />
        <button className={addButtonClassName} onClick={this.add}>{addButtonText}</button>
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

InputList.childContextTypes = {
  store: PropTypes.string,
};

export default InputList;
