import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  const {
    required,
    maxLength,
    name,
    disabled,
    placeholder,
    handleChange,
    isValid,
    cols,
    rows,
    readOnly,
  } = props;

  return (
    <textarea
      name={name}
      aria-invalid={!isValid}
      aria-required={required}
      onChange={handleChange}
      onBlur={props.validate}
      maxLength={maxLength}
      value={props.value}
      disabled={disabled}
      readOnly={readOnly ? true : null}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
    />
  );
};

TextArea.propTypes = {
  validate: PropTypes.func,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  isValid: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  readOnly: PropTypes.bool,
};

TextArea.defaultProps = {
  value: '',
};

export default TextArea;
