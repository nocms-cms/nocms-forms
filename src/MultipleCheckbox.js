import React, { PropTypes } from 'react';
import Checkbox from './helpers/Checkbox';

const MultipleCheckbox = (props) => {
  const {
    controlGroupClass,
    inlineLabel,
    inlineLabelClass,
    checkboxClass,
    labelId,
    labelClass,
    label,
    handleChange,
    value,
  } = props;


  let containerClasses = `${controlGroupClass} ${checkboxClass}`;
  if (inlineLabel) {
    containerClasses += ` ${inlineLabelClass}`;
  }

  const toggleCheckbox = (e) => {
    handleChange(e);
  };
  const createCheckboxes = props.options.map((option, idx) => (<Checkbox
    label={option.label}
    value={option.value}
    checkedValues={value}
    name={props.name}
    handleCheckboxChange={toggleCheckbox} key={idx}
  />),
  );

  return (
    <div className={containerClasses}>
      <fieldset>
        <legend id={labelId} className={labelClass}>
          {label}
        </legend>
        {createCheckboxes}
      </fieldset>
    </div>
  );
};

MultipleCheckbox.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  inlineLabel: PropTypes.bool,
  inlineLabelClass: PropTypes.string,
  checkboxClass: PropTypes.string,
  label: PropTypes.string,
  labelId: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
};

MultipleCheckbox.defaultProps = {
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  checkboxClass: 'form__multi-checkbox',
  value: [],
};

export default MultipleCheckbox;
