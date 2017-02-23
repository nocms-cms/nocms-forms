import React, { PropTypes } from 'react';

const TextArea = (props) => {
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
    handleChange,
    isValid,
    isValidated,
  } = props;

  let containerClasses = controlGroupClass;
  if (isValid && isValidated) {
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
      <label id={labelId}>
        <span className={labelClass}>
          {label}
          {required ? <span className={requiredClass}>{requiredMark}</span> : null}
        </span>
        <textarea
          name={name}
          aria-invalid={!isValid}
          aria-required={required}
          onChange={handleChange}
          onBlur={props.validate}
          maxLength={maxLength}
          value={props.value}
          disabled={disabled}
          placeholder={placeholder}
        />

        {errorText && !props.isValid ?
          <div className={errorTextClass}>{errorText}</div>
       : null}
      </label>
    </div>
  );
};

TextArea.propTypes = {
  errorTextClass: PropTypes.string,
  labelClass: PropTypes.string,
  successWrapperClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  validate: PropTypes.func,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  isValidated: PropTypes.bool,
  isValid: PropTypes.bool,
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
  value: '',
};

export default TextArea;
