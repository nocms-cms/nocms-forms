import React, { Component, PropTypes } from 'react';

export default class RadioButtons extends Component {
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
    if (this.props.isValid && this.props.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.props.isValid) {
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
            checked={this.props.value === option.value}
            type="radio"
            value={option.value}
            name={name}
            disabled={option.disabled}
            onChange={this.props.onChange}
            onClick={this.props.handleChange}
            onKeyDown={this.props.handleKeyDown}
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
          {errorText && !this.props.isValid ?
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
  isValid: PropTypes.bool,
  isValidated: PropTypes.bool,
  name: PropTypes.string.isRequired,
  successWrapperClass: PropTypes.string,
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  requiredClass: PropTypes.string,
  value: PropTypes.string,
  errorText: PropTypes.string,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  required: PropTypes.bool,
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
