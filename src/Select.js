/* eslint arrow-body-style: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import MultipleSelect from './MultipleSelect';

const Select = (props) => {
  const {
    name,
    value,
    isValid,
    disabled,
    options,
    required,
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
      return <option key={`opt${index}`} value={option.value}>{option.label}</option>; // eslint-disable-line react/no-array-index-key
    });
  };

  const getGroupedOptionsList = (optionsArr) => {
    return optionsArr.map((o, index) => {
      return <optgroup label={o.groupLabel} key={index}>{ getOptionsList(o.options) }</optgroup>; // eslint-disable-line react/no-array-index-key
    });
  };

  const emptyOption = emptyLabel && !multiple ? [<option key="empty" value="">{emptyLabel}</option>] : [];
  const optionsList = groupedOptions ? getGroupedOptionsList(options) : getOptionsList(options);
  const optionsListCompleted = emptyOption.concat(optionsList);
  if (multiple) {
    return (
      <MultipleSelect name={name} disabled={disabled} value={value} handleChange={props.handleChange} onKeyDown={handleKeyDown} onBlur={props.validate}>
        {optionsListCompleted}
      </MultipleSelect>
    );
  }

  return (
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
  );
};

Select.propTypes = {
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  name: PropTypes.string.isRequired,
  emptyLabel: PropTypes.string,
  options: PropTypes.array,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  handleKeyDown: PropTypes.func,
  validate: PropTypes.func,
  multiple: PropTypes.bool,
  groupedOptions: PropTypes.bool,
};

Select.defaultProps = {
};

export default Select;
