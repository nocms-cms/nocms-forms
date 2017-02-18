import React, { Component, PropTypes } from 'react';
import Validator from 'nocms-validation';
import utils from 'nocms-utils';
import stores from 'nocms-stores';

export default class TextArea extends Component {
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
    if (this.props.isValid && this.props.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.props.isValid) {
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
            aria-invalid={!this.props.isValid}
            aria-required={required}
            onChange={this.props.handleChange}
            onBlur={this.props.validate}
            maxLength={maxLength}
            value={this.props.value}
            disabled={disabled}
            placeholder={placeholder}
          />

        {errorText && !this.props.isValid ?
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
  validate: PropTypes.func,
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
