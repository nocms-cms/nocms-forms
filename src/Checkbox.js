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
    name,
    disabled,
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
          checked={props.value ? 'checked' : null}
          value={props.value}
          disabled={props.disabled ? true : null}
          aria-invalid={!props.isValid}
          aria-required={required}
          onChange={props.handleChange}
          onClick={props.handleChange}
          onKeyDown={props.handleKeyDown}
          onBlur={props.validate}
        />
        <span className={labelClass}>
          {label}
          {required ? <span className={requiredClass}>{requiredMark}</span> : null}
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
  type: 'text',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  requiredClass: 'form__label--required',
  required: false,
  disabled: false,
  placeholder: '',
};

export default Checkbox;
