import React, { PropTypes } from 'react';

const RadioButtons = (props) => {
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
    notRequiredClass,
    notRequiredMark,
    name,
    options,
    radioClass,
    requiredClass,
    radioLabelClass,
    value,
    handleChange,
  } = props;

  let containerClasses = ` ${controlGroupClass} ${radioClass}`;
  if (props.isValid && props.isValidated) {
    containerClasses += ` ${successWrapperClass}`;
  }
  if (!props.isValid) {
    containerClasses += ` error-node ${errorWrapperClass}`;
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
          checked={value === option.value}
          type="radio"
          value={option.value}
          name={name}
          disabled={option.disabled}
          onChange={handleChange}
          onClick={handleChange}
          onKeyDown={props.handleKeyDown}
        />
        <span className={radioLabelClass}>{option.label}</span>
      </label>);
  });
  return (
    <div className={containerClasses}>
      <fieldset>
        <legend>
          {label}
          {required && requiredMark ? <span className={requiredClass}>{requiredMark}</span> : null}
          {!required && notRequiredMark ? <span className={notRequiredClass}>{notRequiredMark}</span> : null}
        </legend>
        {radios}
        {errorText && !props.isValid ?
          <div className={errorTextClass}>{props.errorText}</div>
        : null}
      </fieldset>
    </div>
  );
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
  requiredMark: PropTypes.string,
  notRequiredClass: PropTypes.string,
  notRequiredMark: PropTypes.string,
  value: PropTypes.string,
  errorText: PropTypes.string,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  radioClass: PropTypes.string,
  radioLabelClass: PropTypes.string,
};

RadioButtons.defaultProps = {
  required: false,
  requiredMark: '*',
  notRequiredMark: null,
  errorTextClass: 'form__error-text',
  controlGroupClass: 'form__control-group',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  radioClass: 'form__control-group--radio',
  labelClass: 'form__label',
  radioLabelClass: 'form__radio-label',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required',
};

export default RadioButtons;
