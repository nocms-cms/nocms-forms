import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';
import uuid from 'uuid/v4';

class InputList extends Component {
  constructor(props, context) {
    super(props);

    this.store = `${context.store}-${props.name}`;
    this.state = {
      items: [props.of],
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  getChildContext() {
    return {
      store: this.store,
    };
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      const initialState = {};
      stores.createStore(this.store, initialState, this.handleStoreChange);

      stores.patch(this.context.store, {
        isValid: true,
        isValidated: false,
        validate: () => { return this.validate; },
      });
    }
  }

  getValue() {
    const store = stores.getStore(this.store);

    return Object.values(store).reduce((value, field) => {
      if (field.getValue) {
        return [...value, field.getValue()];
      }
      return [...value, field.value];
    }, []);
  }

  validate() {
    let allFieldsAreValid = false;
    const store = stores.getStore(this.store);

    Object.values(store).forEach((field) => {
      let thisFieldIsValid = false;

      if (!field.isValidated) {
        thisFieldIsValid = field.validate();
        field.isValidated = true;
      }

      allFieldsAreValid = allFieldsAreValid && thisFieldIsValid;
    });

    return allFieldsAreValid;
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
      name: `${of.props.name}-${uuid()}`,
    });

    const items = [...this.state.items, item];
    this.setState({ items });
  }

  remove(e, item) {
    e.preventDefault();

    const items = this.state.items.filter((itm) => { return itm.props.name !== item.props.name; });
    //  copy the contents of the existing store
    const store = stores.getStore(this.store);
    //  remove the item from the store
    delete store[item.props.name];
    //  remove the existing store
    stores.remove(this.store, this.handleStoreChange);
    //  create a new store that does not contain the removed item
    stores.createStore(this.store, store, this.handleStoreChange);

    this.setState({ items });
    //  Trigger handleStoreChange such that we don't get validation errors on the input element we just removed.
    this.handleStoreChange(stores.getStore(this.store));
  }

  render() {
    const { addButtonText, removeButtonText, showRemoveButton, addButtonClassName, removeButtonClassName } = this.props;

    return (
      <div>
        {
          this.state.items.map((item) => {
            return (
              <div key={item.props.name ? item.props.name : 'name'}>
                { item }
                { showRemoveButton && <button className={removeButtonClassName} onClick={(e) => { return this.remove(e, item); }}>{removeButtonText}</button> }
              </div>
            );
          })
        }
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
