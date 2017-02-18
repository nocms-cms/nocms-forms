import React, { Component, PropTypes } from 'react';
import Validator from 'nocms-validation';
import utils from 'nocms-utils';
import stores from 'nocms-stores';

export default class RadioButtons extends Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
      validate: this.validate,
    };
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      stores.subscribe(this.context.store, this.handleStoreChange);
      const store = stores.getStore(this.context.store);
      const initialState = store[this.props.name];
      let inputState = {};
      inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate };

      if (typeof initialState === 'undefined') {
        inputState[this.props.name].value = this.props.value;
      } else if (typeof initialState !== 'object') {
        inputState[this.props.name].value = initialState;
      } else {
        inputState = initialState;
      }
      stores.update(this.context.store, inputState);
    }
  }

  componentWillUnmount() {
    if (utils.isBrowser()) {
      stores.unsubscribe(this.context.store, this.handleStoreChange);
    }
  }

  handleStoreChange(store) {
    this.setState(store[this.props.name]);
  }

  handleChange(e) {
    const state = {};
    state[this.props.name] = {
      value: e.currentTarget.value,
      isValid: true,
      isValidated: this.state.isValidated,
      validate: this.validate,
    };
    stores.update(this.context.store, state);
    if (this.props.onChange) {
      this.props.onChange(e, e.currentTarget.value);
    }
  }
  handleEnterKey(e) {
    if (e.keyCode === 13) { // Enter
      this.validate();
    }
  }
  validate() {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      const state = {};
      state[this.props.name] = {
        value: this.state.value,
        isValid,
        isValidated: true,
        validate: this.validate,
      };
      stores.update(this.context.store, state);
      return isValid;
    }
    return true;
  }
  render() {
    const {
      controlGroupClass,
      successWrapperClass,
      errorText,
      errorTextClass,
      errorWrapperClass,
      labelClass,
      label,
      required,
      requiredMark,
      name,
      options,
      radioClass,
      requiredClass,
      radioLabelClass,
    } = this.props;

    let containerClasses = ` ${controlGroupClass} ${radioClass}`;
    if (this.state.isValid && this.state.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.state.isValid) {
      containerClasses += ` ${errorWrapperClass}`;
    }
    const radios = options.map((o, index) => {
      let option = o;
      if (typeof option === 'string') {
        option = { label: option, value: option };
      }
      let labelClasses = labelClass;
      if (option.disabled) {
        labelClasses += ` ${labelClass}--disabled`;
      }
      return (
        <label key={`${name}_${index}`} className={labelClasses}>
          <input
            checked={this.state.value === option.value}
            type="radio"
            value={option.value}
            name={name}
            disabled={option.disabled}
            onChange={this.handleChange}
            onClick={this.handleChange}
            onKeyDown={this.handleEnterKey}
          />
          <span className={radioLabelClass}>{option.label}</span>
        </label>);
    });
    return (
      <div className={containerClasses}>
        <fieldset>
          <legend>
            {label}
            {required ? <span className={requiredClass}>{requiredMark}</span> : null}
          </legend>
          {radios}
          {errorText && !this.state.isValid ?
            <div className={errorTextClass}>{this.props.errorText}</div>
          : null}
        </fieldset>
      </div>
    );
  }
}

RadioButtons.contextTypes = {
  store: React.PropTypes.string, // we get this from Form.js
};

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  successWrapperClass: PropTypes.string,
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  requiredClass: PropTypes.string,
  value: PropTypes.string,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  validate: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  requiredMark: PropTypes.string,
  radioClass: PropTypes.string,
  radioLabelClass: PropTypes.string,
};

RadioButtons.defaultProps = {
  required: false,
  requiredMark: '*',
  errorTextClass: 'form__error-text',
  controlGroupClass: 'form__control-group',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  radioClass: 'form__control-group--radio',
  labelClass: 'form__label',
  radioLabelClass: 'form__radio-label',
  requiredClass: 'form__label--required',
};
