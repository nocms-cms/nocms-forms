import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'nocms-validation';
import utils from 'nocms-utils';
import stores from 'nocms-stores';
import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import Hidden from './Hidden';
import RadioButtons from './RadioButtons';
import TextArea from './TextArea';
import MultipleCheckbox from './MultipleCheckbox';

class Field extends Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.applyExistingStoreValue = this.applyExistingStoreValue.bind(this);
    this.didDependentOnValueChange = this.didDependentOnValueChange.bind(this);
    this.initDependentState = this.initDependentState.bind(this);
    this.getProps = this.getProps.bind(this);
    this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
      disabled: props.disabled,
      hidden: false,
    };
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      stores.subscribe(this.context.store, this.handleStoreChange);
      this.applyExistingStoreValue();
    }
  }

  componentDidMount() {
    this.initDependentState();
  }

  componentWillReceiveProps(props) {
    if (typeof props.disabled !== 'undefined' && props.disabled !== this.state.disabled) {
      this.setState({ disabled: props.disabled, isValid: true, isValidated: false }, () => {
        this.updateStore(this.state.value, true, false);
      });
    }
  }

  componentWillUnmount() {
    if (utils.isBrowser()) {
      stores.unsubscribe(this.context.store, this.handleStoreChange);
      // Tryner ved wizard og neste-klikk
      // Slettes ikke fra wizard-data
      if (this.props.deleteOnUnmount) {
        const inputState = {};
        inputState[this.props.name] = undefined;
        stores.update(this.context.store, inputState);
      }
    }
  }

  getProps() {
    const result = Object.assign({}, this.props, this.state);

    if (this.state.aggregatedValue) {
      result.value = this.state.aggregatedValue;
    }
    if (this.state.aggregatedDisabled) {
      result.disabled = this.state.aggregatedDisabled;
    }
    if (this.state.aggregatedReadOnly) {
      result.readOnly = this.state.aggregatedReadOnly;
    }
    if (this.state.aggregatedHidden) {
      result.hidden = this.state.aggregatedHidden;
    }
    if (this.state.aggregatedControlGroupClass) {
      result.controlGroupClass = `${result.controlGroupClass} ${this.state.aggregatedControlGroupClass}`;
    }
    return result;
  }

  applyExistingStoreValue() {
    const store = stores.getStore(this.context.store);
    const initialState = store[this.props.name];
    const inputState = {};
    inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate, disabled: this.state.disabled };

    if (typeof initialState === 'undefined' || initialState === null) {
      if (this.props.type === 'text' || this.props.type === 'textarea' || this.props.type === 'hidden' || (this.props.type === 'select' && !this.props.multiple)) {
        inputState[this.props.name].value = this.props.value || '';
      }
    } else if (typeof initialState !== 'object' || initialState instanceof Array) {
      inputState[this.props.name].value = initialState;
    } else {
      inputState[this.props.name] = initialState;
    }

    stores.update(this.context.store, inputState);
  }

  initDependentState() {
    if (this.props.dependOn && this.props.dependencyFunc) {
      const store = stores.getStore(this.context.store);
      const fields = {};
      this.props.dependOn.split(',').forEach((f) => {
        fields[f] = store[f];
      });
      this.handleDependentState(store, fields);
    }
  }

  handleStoreChange(store, changes) {
    if (this.props.dependOn && this.props.dependencyFunc && this.handleDependentState(store, changes)) {
      return;
    }
    if (this.props.dependOn && this.props.deleteOnDependencyChange && this.clearFromStore(store, changes)) {
      return;
    }
    let newState = store[this.props.name];
    if (typeof newState !== 'object') {
      // Upgrade simple data values to input state in store
      newState = {
        value: newState,
        isValid: true,
        isValidated: false,
      };
    }
    this.setState(newState);
  }

  clearFromStore(store, changes) {
    const { name } = this.props;
    if (this.didDependentOnValueChange(store, changes)) {
      if (store[name] && this.props.deleteOnDependencyChange(changes, store[name].value)) {
        stores.update(this.context.store, { [this.props.name]: undefined });
      }
    }
  }

  didDependentOnValueChange(store, changes) {
    const fields = this.props.dependOn.split(',').map((f) => { return f.trim(); });
    // Check if any of the changed values are in the dependOn list
    return fields.reduce((val, f) => { return !!changes[f] || val; }, false);
  }

  handleDependentState(store, changes) {
    if (this.didDependentOnValueChange(store, changes)) {
      const aggregatedState = { isValid: true, isValidated: true };

      const dependentProp = store[this.props.name];
      const dependencyFuncResult = this.props.dependencyFunc(changes, dependentProp ? dependentProp.value : undefined);
      if (typeof dependencyFuncResult === 'object') {
        if (typeof dependencyFuncResult.disabled !== 'undefined') {
          aggregatedState.aggregatedDisabled = dependencyFuncResult.disabled;
        }

        if (typeof dependencyFuncResult.hidden !== 'undefined') {
          aggregatedState.aggregatedHidden = dependencyFuncResult.hidden;
        }

        if (typeof dependencyFuncResult.value !== 'undefined') {
          aggregatedState.aggregatedValue = dependencyFuncResult.value;
        }

        if (typeof dependencyFuncResult.readOnly !== 'undefined') {
          aggregatedState.aggregatedReadOnly = dependencyFuncResult.readOnly;
        }

        if (typeof dependencyFuncResult.controlGroupClass !== 'undefined') {
          aggregatedState.aggregatedControlGroupClass = dependencyFuncResult.controlGroupClass;
        }
      } else {
        aggregatedState.aggregatedValue = dependencyFuncResult;
      }

      this.setState(aggregatedState, () => {
        if (aggregatedState.value) {
          this.updateStore(aggregatedState.value, true, true);
        }
      });
      return true;
    }
    return false;
  }


  handleChange(e) {
    let value;
    if (this.props.type === 'checkbox') {
      if (this.props.multiple) {
        const oldValue = this.state.value || [];
        if (e.target.checked) {
          value = [...oldValue, e.target.value];
        } else {
          value = oldValue.filter((v) => { return v !== e.target.value; });
        }
      } else {
        value = e.currentTarget.checked;
      }
    } else if (this.props.type === 'select' && this.props.multiple) {
      value = [...e.target.options].filter((o) => { return o.selected; }).map((o) => { return o.value; });
    } else {
      value = e.currentTarget.value;
    }
    this.updateStore(value, true, this.state.isValidated);
    if (this.props.onChange) {
      this.props.onChange(e, e.currentTarget.value);
    }
  }

  handleEnterKey(e) {
    if (e.keyCode === 13) { // Enter
      e.preventDefault();
      this.validate();
    }
  }

  updateStore(value, isValid, isValidated) {
    const state = {};
    state[this.props.name] = {
      value,
      isValid,
      isValidated,
      disabled: this.state.disabled,
      validate: this.validate,
    };

    stores.update(this.context.store, state);
  }

  validate() {
    if (this.state.disabled) {
      return true;
    }
    if (!this.props.validate && !this.props.required) {
      return true;
    }
    let value = this.state.value;
    if (this.props.type === 'date' && this.props.dateParser) {
      value = this.props.dateParser(value);
    }
    const isValid = Validator.validate(value, this.props.validate, this.props.required);
    this.updateStore(value, isValid, true);
    return isValid;
  }

  render() {
    const { type, options, multiple } = this.props;
    const props = this.getProps(this.props, this.state);

    props.handleChange = this.handleChange;
    props.handleKeyDown = this.handleEnterKey;
    props.validate = this.validate;
    props.key = this.props.name;

    if (type === 'hidden') {
      return <Hidden {...props} />;
    }
    if (type === 'radio') {
      return <RadioButtons {...props} />;
    }
    if (type === 'textarea') {
      return <TextArea {...props} />;
    }
    if (type === 'select') {
      return <Select {...props} />;
    }
    if (type === 'checkbox') {
      return options && multiple ? <MultipleCheckbox {...props} /> : <Checkbox {...props} />;
    }
    return <Input {...props} />;
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  deleteOnUnmount: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dependOn: PropTypes.string,
  dependencyFunc: PropTypes.func,
  deleteOnDependencyChange: PropTypes.func,
  dateParser: PropTypes.func,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  options: PropTypes.array,
};

Field.defaultProps = {
  type: 'text',
};

Field.contextTypes = {
  store: PropTypes.string, // we get this from Form.js
};

export default Field;
