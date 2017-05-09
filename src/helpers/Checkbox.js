import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const { label, value, name, checkedValues, handleCheckboxChange, labelClass } = props;

  const toggleCheckboxChange = (e) => {
    handleCheckboxChange(e);
  };

  const isChecked = (checkedValues.indexOf(value) >= 0);
  return (
    <div className="checkbox">
      <label className={labelClass}>
        <input
          type="checkbox"
          autoComplete="off"
          value={value}
          name={name}
          checked={isChecked}
          onChange={toggleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  checkedValues: PropTypes.array,
  labelClass: PropTypes.array,
};

Checkbox.defaultProps = {
  labelClass: '',
}

export default Checkbox;
