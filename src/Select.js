/* eslint arrow-body-style: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import MultipleSelect from './MultipleSelect';

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
    groupedOptions,
    handleChange,
    handleKeyDown,
    validate,
  } = props;

  const getOptionsList = (optionsArr) => {
    return optionsArr.map((o, index) => {
      let option = o;
      if (typeof option === 'string') {
        option = { label: option, value: option };
      }
      return <option key={index} value={option.value}>{option.label}</option>;
    });
  };

  const getGroupedOptionsList = (optionsArr) => {
    return optionsArr.map((o, index) => {
      return <optgroup label={o.groupLabel} key={index}>{ getOptionsList(o.options) }</optgroup>;
    });
  };

  let containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
    containerClasses += ` ${successWrapperClass}`;
  }
  if (!props.isValid) {
    containerClasses += ` error-node ${errorWrapperClass}`;
  }

  const emptyOption = emptyLabel && !multiple ? [<option key="empty" value="">{emptyLabel}</option>] : [];
  const optionsList = groupedOptions ? getGroupedOptionsList(options) : getOptionsList(options);
  const optionsListCompleted = emptyOption.concat(optionsList);

  return (
    <div className={containerClasses}>
      <label>
        <span className={labelClass}>
          {label}
          {required && requiredMark ? <span className={requiredClass}>{requiredMark}</span> : null}
          {!required && notRequiredMark ? <span className={notRequiredClass}>{notRequiredMark}</span> : null}
        </span>
        { multiple ?
          <MultipleSelect name={name} disabled={disabled} value={value} handleChange={props.handleChange} onKeyDown={handleKeyDown} onBlur={props.validate}>
            {optionsListCompleted}
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
            {optionsListCompleted}
          </select>
        }
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
  groupedOptions: PropTypes.bool,
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
