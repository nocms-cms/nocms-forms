import { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';

class InputListItem extends Component {
  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      stores.createStore(this.props.store, this.handleStoreChange);
    }
  }

  componentDidMount() {
    if (utils.isBrowser()) {
      this.props.addListItem(this.props.store, this.getValue, this.validate);
    }
  }

  getValue() {
    const store = stores.getStore(this.props.store);
    const value = {};

    Object.keys(store).forEach((key) => {
      if (store[key].getValue) {
        value[key] = store[key].getValue();
      } else {
        value[key] = store[key].value;
      }
    });

    return value;
  }

  validate() {
    let allFieldsAreValid = true;
    const store = stores.getStore(this.props.store);

    Object.values(store).forEach((field) => {
      let thisFieldIsValid = false;
      thisFieldIsValid = (!field.isValidated && !field.isValid) || field.validate();

      allFieldsAreValid = allFieldsAreValid && thisFieldIsValid;
    });

    return allFieldsAreValid;
  }

  render() {
    return this.props.children || '';
  }
}

InputListItem.childContextTypes = {
  store: PropTypes.string,
};

InputListItem.propTypes = {
  store: PropTypes.string,
  children: PropTypes.node,
  addListItem: PropTypes.func,
  removeListItem: PropTypes.func,
};

export default InputListItem;
