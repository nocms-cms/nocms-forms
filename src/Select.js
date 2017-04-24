import React, { PropTypes } from 'react';
import MultipleSelect from './MultipleSelect.jsx';

const Select = (props) => {
  const {
    controlGroupClass,
    successWrapperClass,
    errorText,
    errorTextClass,
    errorWrapperClass,
    labelClass,
    label,
    name,
    value,
    isValid,
    disabled,
    options,
    required,
    requiredClass,
    requiredMark,
    notRequiredMark,
    notRequiredClass,
    emptyLabel,
    multiple,
    handleChange,
    handleKeyDown,
    validate,
  } = props;

  let containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
    containerClasses += ` ${successWrapperClass}`;
  }
  if (!props.isValid) {
    containerClasses += ` ${errorWrapperClass}`;
  }

  const emptyOption = emptyLabel && !multiple ? [<option key="empty" value="">{emptyLabel}</option>] : [];
  const optionsList = emptyOption.concat(options.map((o, index) => {
    let option = o;
    if (typeof option === 'string') {
      option = { label: option, value: option };
    }
    return <option key={index} value={option.value}>{option.label}</option>;
  }));

  return (
    <div className={containerClasses}>
      <label>
        <span className={labelClass}>
          {label}
          {required && requiredMark ? <span className={requiredClass}>{requiredMark}</span> : null}
          {!required && notRequiredMark ? <span className={notRequiredClass}>{notRequiredMark}</span> : null}
        </span>
        { multiple ? <MultipleSelect name={name} disabled={disabled} value={value} handleChange={props.handleChange} onKeyDown={handleKeyDown} onBlur={props.validate}>
          {optionsList}
        </MultipleSelect> :
        <select
          name={name}
          disabled={disabled}
          value={value}
          aria-invalid={!isValid}
          aria-required={required}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={validate}
        >
          {optionsList}
        </select> }
        {errorText && !isValid ?
          <div className={errorTextClass}>{errorText}</div>
        : null}
      </label>
    </div>
  );
};

Select.propTypes = {
  isValid: PropTypes.bool,
  isValidated: PropTypes.bool,
  disabled: PropTypes.bool,
  requiredMark: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  successWrapperClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  emptyLabel: PropTypes.string,
  options: PropTypes.array,
  errorText: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  requiredClass: PropTypes.string,
  notRequiredClass: PropTypes.string,
  notRequiredMark: PropTypes.string,
  handleKeyDown: PropTypes.func,
  label: PropTypes.string,
  validate: PropTypes.func,
  multiple: PropTypes.bool,
};

Select.defaultProps = {
  requiredMark: '*',
  notRequiredMark: null,
  errorWrapperClass: 'form__control-group--error',
  successWrapperClass: 'form__control-group--success',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required',
};

export default Select;
