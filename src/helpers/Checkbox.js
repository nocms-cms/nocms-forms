import React, { PropTypes } from 'react';

const Checkbox = (props) => {
  const { label, value, name, checkedValues, handleCheckboxChange } = props;

  const toggleCheckboxChange = (e) => {
    handleCheckboxChange(e);
  };

  const isChecked = (checkedValues.indexOf(value) >= 0);
  return (
    <div className="checkbox">
      <label >
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
};

export default Checkbox;
