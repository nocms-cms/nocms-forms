import React from 'react';
import PropTypes from 'prop-types';

const MultipleSelect = (props) => {
  const {
    name,
    disabled,
    value,
    isValid,
    required,
    handleChange,
    handleKeyDown,
    validate,
    children,
  } = props;
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
      multiple
    >
      {children}
    </select>
  );
};

MultipleSelect.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.array,
  isValid: PropTypes.bool,
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  validate: PropTypes.func,
  required: PropTypes.bool,
  children: PropTypes.array,
};

MultipleSelect.defaultProps = {
  value: [],
};

export default MultipleSelect;
