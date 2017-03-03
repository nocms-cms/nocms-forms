import React, { PropTypes } from 'react';

const Checkbox = (props) => {
  const {
    controlGroupClass,
    successWrapperClass,
    inlineLabel,
    type,
    errorText,
    errorTextClass,
    errorWrapperClass,
    inlineLabelClass,
    checkboxClass,
    labelId,
    labelClass,
    label,
    required,
    requiredClass,
    requiredMark,
    notRequiredClass,
    notRequiredMark,
    name,
    disabled,
    value,
  } = props;

  let containerClasses = `${controlGroupClass} ${checkboxClass}`;
  if (props.isValid && props.isValidated) {
    containerClasses += ` ${successWrapperClass}`;
  }
  if (!props.isValid) {
    containerClasses += ` ${errorWrapperClass}`;
  }
  if (inlineLabel) {
    containerClasses += ` ${inlineLabelClass}`;
  }
  return (
    <div className={containerClasses}>
      {inlineLabel && errorText && !props.isValid ?
        <div className={errorTextClass}>{errorText}</div>
      : null}
      <label id={labelId}>
        <input
          type={type}
          autoComplete="off"
          name={name}
          checked={value === true ? 'checked' : null}
          value={props.value}
          disabled={disabled ? true : null}
          aria-invalid={!props.isValid}
          aria-required={required}
          onChange={props.handleChange}
          onClick={props.handleChange}
          onKeyDown={props.handleKeyDown}
          onBlur={props.validate}
        />
        <span className={labelClass}>
          {label}
          {required && requiredMark ? <span className={requiredClass}>{requiredMark}</span> : null}
          {!required && notRequiredMark ? <span className={notRequiredClass}>{notRequiredMark}</span> : null}
        </span>
        {!inlineLabel && errorText && !props.isValid ?
          <div className={` ${errorTextClass}`}>{errorText}</div>
        : null}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  handleChange: PropTypes.func,
  isValid: PropTypes.bool,
  isValidated: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.bool,
  successWrapperClass: PropTypes.string,
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  required: PropTypes.bool,
  requiredClass: PropTypes.string,
  notRequiredClass: PropTypes.string,
  notRequiredMark: PropTypes.string,
  validate: PropTypes.func,
  handleKeyDown: PropTypes.func,
  inlineLabel: PropTypes.bool,
  inlineLabelClass: PropTypes.string,
  checkboxClass: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string,
  requiredMark: PropTypes.string,
  disabled: PropTypes.bool,
  labelId: PropTypes.string,
};

Checkbox.defaultProps = {
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  requiredMark: '*',
  notRequiredMark: null,
  type: 'text',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required',
  required: false,
  disabled: false,
  value: false,
};

export default Checkbox;
