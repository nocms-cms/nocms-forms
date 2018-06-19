import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    type,
    required,
    maxLength,
    name,
    disabled,
    readOnly,
    placeholder,
  } = props;

  if (type === 'hidden') {
    return <input type="hidden" value={props.value} name={name} />;
  }

  return (
    <input
      type={type}
      autoComplete={props.autoComplete || 'off'}
      maxLength={maxLength}
      name={name}
      value={props.value || ''}
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
  );
};

Input.propTypes = {
  handleChange: PropTypes.func,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.func,
  handleKeyDown: PropTypes.func,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  autoComplete: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  placeholder: '',
  value: '',
};

export default Input;
