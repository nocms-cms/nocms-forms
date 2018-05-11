import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const {
    type,
    required,
    name,
    disabled,
    value,
  } = props;

  return (
    <input
      type={type}
      autoComplete="off"
      name={name}
      checked={value}
      value={props.value ? 'true' : ''}
      disabled={disabled ? true : null}
      aria-invalid={!props.isValid}
      aria-required={required}
      onChange={props.handleChange}
      onKeyDown={props.handleKeyDown}
      onBlur={props.validate}
    />
  );
};

Checkbox.propTypes = {
  handleChange: PropTypes.func,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.bool,
  required: PropTypes.bool,
  validate: PropTypes.func,
  handleKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  value: false,
};

export default Checkbox;
