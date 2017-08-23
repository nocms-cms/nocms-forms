import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    controlGroupClass,
    successWrapperClass,
    inlineLabel,
    type,
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
    notRequiredClass,
    notRequiredMark,
    maxLength,
    name,
    disabled,
    readOnly,
    placeholder,
  } = props;

  if (type === 'hidden') {
    return <input type="hidden" value={props.value} name={name} />;
  }

  let containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
    containerClasses += ` ${successWrapperClass}`;
  }
  if (!props.isValid) {
    containerClasses += ` error-node ${errorWrapperClass}`;
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
        <span className={labelClass}>
          {label}
          {required && requiredMark ? <span className={requiredClass}>{requiredMark}</span> : null}
          {!required && notRequiredMark ? <span className={notRequiredClass}>{notRequiredMark}</span> : null}
        </span>
        <input
          type={type}
          autoComplete="off"
          maxLength={maxLength}
          name={name}
          value={props.value}
          disabled={disabled ? true : null}
          readOnly={readOnly ? true : null}
          placeholder={placeholder}
          aria-invalid={!props.isValid}
          aria-required={required}
          onChange={props.handleChange}
          onKeyDown={props.handleKeyDown}
          onBlur={props.validate}
          min={props.min}
          max={props.max}
        />
        {!inlineLabel && errorText && !props.isValid ?
          <div className={errorTextClass}>{errorText}</div>
          : null}
      </label>
    </div>
  );
};

Input.propTypes = {
  handleChange: PropTypes.func,
  isValid: PropTypes.bool,
  isValidated: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  successWrapperClass: PropTypes.string,
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  required: PropTypes.bool,
  requiredClass: PropTypes.string,
  requiredMark: PropTypes.string,
  notRequiredClass: PropTypes.string,
  notRequiredMark: PropTypes.string,
  validate: PropTypes.func,
  handleKeyDown: PropTypes.func,
  inlineLabel: PropTypes.bool,
  inlineLabelClass: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  labelId: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
};

Input.defaultProps = {
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
  placeholder: '',
  value: '',
};

export default Input;
