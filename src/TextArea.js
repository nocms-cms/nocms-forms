import React, { Component, PropTypes } from 'react';
import Validator from 'nocms-validation';
import utils from 'nocms-utils';
import stores from 'nocms-stores';

export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
    };
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      stores.subscribe(this.context.store, this.handleStoreChange);
      const initialState = {};
      initialState[this.props.name] = {
        value: this.props.value,
        isValid: true,
        isValidated: !this.props.required,
        validate: this.validate,
      };
      stores.update(this.context.store, initialState);
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
    const data = {};
    data[this.props.name] = { value: e.currentTarget.value, isValid: true };
    const state = {};
    state[this.props.name] = {
      value: e.currentTarget.value,
      isValid: true,
      isValidated: this.state.isValidated,
      validate: this.validate,
    };
    stores.update(this.context.store, state);
  }
  validate() {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      const state = {};
      state[this.props.name] = {
        value: this.state.value,
        isValid,
        isValidated: true,
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
      inlineLabel,
      errorText,
      errorTextClass,
      errorWrapperClass,
      inlineLabelClass,
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

    let containerClasses = controlGroupClass;
    if (this.state.isValid && this.state.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.state.isValid) {
      containerClasses += ` ${errorWrapperClass}`;
    }
    if (inlineLabel) {
      containerClasses += ` ${inlineLabelClass}`;
    }

    return (
      <div className={containerClasses}>
        <label id={labelId}>
          <span className={labelClass}>
            {label}
            {required ? <span className={requiredClass}>{requiredMark}</span> : null}
          </span>
          <textarea
            name={name}
            aria-invalid={!this.state.isValid}
            aria-required={required}
            onChange={this.handleChange}
            onBlur={this.validate}
            maxLength={maxLength}
            value={this.state.value}
            disabled={disabled}
            placeholder={placeholder}
          />

          {errorText && !this.state.isValid ?
            <div className={errorTextClass}>{errorText}</div>
         : null}
        </label>
      </div>
    );
  }
}

TextArea.contextTypes = {
  store: React.PropTypes.string, // we get this from Form.js
};

TextArea.propTypes = {
  errorTextClass: PropTypes.string,
  labelClass: PropTypes.string,
  successWrapperClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  validate: PropTypes.string,
  required: PropTypes.bool,
  requiredClass: PropTypes.string,
  value: PropTypes.string,
  errorText: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelId: PropTypes.string,
  maxLength: PropTypes.number,
  requiredMark: PropTypes.string,
  inlineLabel: PropTypes.string,
  inlineLabelClass: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

TextArea.defaultProps = {
  requiredMark: '*',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  inlineLabelClass: '',
};
