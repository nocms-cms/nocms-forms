import React, { Component, PropTypes } from 'react';
import Validator from 'nocms-validation';
import utils from 'nocms-utils';
import stores from 'nocms-stores';

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      value: props.value || '',
      isValid: true,
      isValidated: false,
      convertDate: props.type === 'date',
    };
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      stores.subscribe(this.props.store, this.handleStoreChange);
      const store = stores.getStore(this.props.store);
      const initialState = store[this.props.name];
      let inputState = {};
      inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate };

      if (typeof initialState === 'undefined' || initialState === null) {
        inputState[this.props.name].value = this.props.value || '';
      } else if (typeof initialState !== 'object') {
        inputState[this.props.name].value = initialState;
      } else {
        inputState = initialState;
      }

      stores.update(this.props.store, inputState);
    }
  }
  componentWillUnmount() {
    if (global.environment !== 'server') {
      stores.unsubscribe(this.props.store, this.handleStoreChange);
      if (this.props.deleteOnUnmount) {
        const inputState = {};
        inputState[this.props.name] = undefined;
        stores.update(this.props.store, inputState);
      }
    }
  }

  handleDependentState(store, changes) {
    if (this.props.dependOn) {
      const fields = this.props.dependOn.split(',').map(f => f.trim());
      const values = {};

      // Check if any of the changed values are in the dependOn list
      const doUpdate = fields.reduce((val, f) => {
        values[f] = store[f];
        if (changes[f]) {
          return true;
        }
        return val;
      }, false);

      if (!doUpdate) {
        return false;
      }

      const aggregatedValue = this.props.dependencyFunc(values);
      const aggregatedState = { value: aggregatedValue, isValid: true, isValidated: true };
      this.setState(aggregatedState);
      this.updateStore(aggregatedValue, true, true);
      return true;
    }
    return false;
  }

  handleStoreChange(store, changes) {
    if (this.handleDependentState(store, changes)) {
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

  handleChange(e) {
    const value = this.props.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
    this.updateStore(value, true, this.state.isValidated);
  }

  handleEnterKey(e) {
    if (e.keyCode === 13) { // Enter
      this.validate();
    }
  }

  handleBlur(e) {
    e.stopPropagation();
    this.validate();
  }

  updateStore(value, isValid, isValidated) {
    const state = {};
    state[this.props.name] = {
      value,
      isValid,
      isValidated,
      validate: this.validate,
      convertDate: this.props.type === 'date',
    };

    stores.update(this.props.store, state);
  }

  validate() {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      this.updateStore(this.state.value, isValid, true);

      return isValid;
    }
    return true;
  }

  render() {
    const {
      controlGroupClass,
      successWrapperClass,
      inlineLabel,
      type,
      errorText,
      errorTextClass,
      labelId,
      labelClass,
      label,
      required,
      requiredClass,
      requiredMark,
      maxLength,
      name,
      disabled,
      placeholder,
    } = this.props;

    if (type === 'hidden') {
      return <input type="hidden" value={this.state.value} name={name} />;
    }

    let containerClasses = controlGroupClass;
    if (this.state.isValid && this.state.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.state.isValid) {
      containerClasses += ` ${this.props.errorWrapperClass}`;
    }
    if (inlineLabel) {
      containerClasses += ` ${this.props.inlineLabelClass}`;
    }
    if (type === 'checkbox') {
      containerClasses += ` ${this.props.checkboxClass}`;
    }
    return (
      <div className={containerClasses}>
        {inlineLabel && errorText && !this.state.isValid ?
          <div className={errorTextClass}>{errorText}</div>
        : null}
        <label id={labelId}>
          <span className={labelClass}>
            {label}
            {required ? <span className={requiredClass}>{requiredMark}</span> : null}
          </span>
          <input
            type={type}
            autoComplete="off"
            maxLength={maxLength}
            name={name}
            value={this.state.value}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={!this.state.isValid}
            aria-required={required}
            onChange={this.handleChange}
            onClick={type === 'checkbox' ? this.handleChange : null}
            onKeyDown={this.handleEnterKey}
            onBlur={this.handleBlur}
          />

          {!inlineLabel && errorText && !this.state.isValid ?
            <div className={` ${errorTextClass}`}>{errorText}</div>
         : null}
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  store: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  successWrapperClass: PropTypes.string,
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  required: PropTypes.bool,
  requiredClass: PropTypes.string,
  deleteOnUnmount: PropTypes.bool,
  validate: PropTypes.string,
  inlineLabel: PropTypes.bool,
  inlineLabelClass: PropTypes.string,
  checkboxClass: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string,
  requiredMark: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  labelId: PropTypes.string,
  dependOn: PropTypes.string,
  dependencyFunc: PropTypes.func,
};

Input.defaultProps = {
  successWrapperClass: 'form__success',
  requiredMark: '*',
  type: 'text',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  errorWrapperClass: 'form__error',
  inlineLabelClass: '',
  requiredClass: 'form__label--required',
  required: false,
  disabled: false,
  placeholder: '',
};

export default Input;
