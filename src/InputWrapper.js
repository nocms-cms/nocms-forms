/* eslint arrow-body-style: "off" */
import React from 'react';
import PropTypes from 'prop-types';

const InputWrapper = (props) => {
  const {
    controlGroupClass,
    successWrapperClass,
    errorText,
    errorTextClass,
    errorWrapperClass,
    labelClass,
    label,
    required,
    requiredClass,
    requiredMark,
    notRequiredMark,
    notRequiredClass,
    isValid,
    inlineLabel,
    type,
    inlineLabelClass,
  } = props;

  let containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
    containerClasses += ` ${successWrapperClass}`;
  }
  if (!props.isValid) {
    containerClasses += ` error-node ${errorWrapperClass}`;
  }
  if (inlineLabel) {
    containerClasses += ` ${inlineLabelClass}`;
  }

  return (
    <div className={containerClasses}>
      { inlineLabel && errorText && !props.isValid ?
        <div className={errorTextClass}>{errorText}</div>
        : null
      }
      <label>
        { type === 'checkbox' ? props.children : null }
        <span className={labelClass}>
          {label}
          {required && requiredMark ? <span className={requiredClass}>{requiredMark}</span> : null}
          {!required && notRequiredMark ? <span className={notRequiredClass}>{notRequiredMark}</span> : null}
        </span>
        { type !== 'checkbox' ? props.children : null }
        {!inlineLabel && errorText && !isValid ?
          <div className={errorTextClass}>{errorText}</div>
          : null}
      </label>
    </div>
  );
};

InputWrapper.propTypes = {
  type: PropTypes.string,
  isValid: PropTypes.bool,
  isValidated: PropTypes.bool,
  requiredMark: PropTypes.string,
  errorTextClass: PropTypes.string,
  errorWrapperClass: PropTypes.string,
  successWrapperClass: PropTypes.string,
  inlineLabelClass: PropTypes.string,
  labelClass: PropTypes.string,
  controlGroupClass: PropTypes.string,
  errorText: PropTypes.string,
  required: PropTypes.bool,
  inlineLabel: PropTypes.bool,
  requiredClass: PropTypes.string,
  notRequiredClass: PropTypes.string,
  notRequiredMark: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

InputWrapper.defaultProps = {
  type: 'text',
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

export default InputWrapper;
