'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextArea = function TextArea(props) {
  var controlGroupClass = props.controlGroupClass,
      successWrapperClass = props.successWrapperClass,
      inlineLabel = props.inlineLabel,
      errorText = props.errorText,
      errorTextClass = props.errorTextClass,
      errorWrapperClass = props.errorWrapperClass,
      inlineLabelClass = props.inlineLabelClass,
      labelId = props.labelId,
      labelClass = props.labelClass,
      label = props.label,
      required = props.required,
      requiredClass = props.requiredClass,
      requiredMark = props.requiredMark,
      notRequiredClass = props.notRequiredClass,
      notRequiredMark = props.notRequiredMark,
      maxLength = props.maxLength,
      name = props.name,
      disabled = props.disabled,
      placeholder = props.placeholder,
      handleChange = props.handleChange,
      isValid = props.isValid,
      isValidated = props.isValidated,
      cols = props.cols,
      rows = props.rows;


  var containerClasses = controlGroupClass;
  if (isValid && isValidated) {
    containerClasses += ' ' + successWrapperClass;
  }
  if (!props.isValid) {
    containerClasses += ' error-node ' + errorWrapperClass;
  }
  if (inlineLabel) {
    containerClasses += ' ' + inlineLabelClass;
  }

  return _react2.default.createElement(
    'div',
    { className: containerClasses },
    _react2.default.createElement(
      'label',
      { id: labelId },
      _react2.default.createElement(
        'span',
        { className: labelClass },
        label,
        required && requiredMark ? _react2.default.createElement(
          'span',
          { className: requiredClass },
          requiredMark
        ) : null,
        !required && notRequiredMark ? _react2.default.createElement(
          'span',
          { className: notRequiredClass },
          notRequiredMark
        ) : null
      ),
      _react2.default.createElement('textarea', {
        name: name,
        'aria-invalid': !isValid,
        'aria-required': required,
        onChange: handleChange,
        onBlur: props.validate,
        maxLength: maxLength,
        value: props.value,
        disabled: disabled,
        placeholder: placeholder,
        rows: rows,
        cols: cols
      }),
      errorText && !props.isValid ? _react2.default.createElement(
        'div',
        { className: errorTextClass },
        errorText
      ) : null
    )
  );
};

TextArea.propTypes = {
  errorTextClass: _propTypes2.default.string,
  labelClass: _propTypes2.default.string,
  successWrapperClass: _propTypes2.default.string,
  errorWrapperClass: _propTypes2.default.string,
  controlGroupClass: _propTypes2.default.string,
  validate: _propTypes2.default.func,
  handleChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  isValidated: _propTypes2.default.bool,
  isValid: _propTypes2.default.bool,
  requiredClass: _propTypes2.default.string,
  notRequiredClass: _propTypes2.default.string,
  notRequiredMark: _propTypes2.default.string,
  value: _propTypes2.default.string,
  errorText: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  labelId: _propTypes2.default.string,
  maxLength: _propTypes2.default.number,
  requiredMark: _propTypes2.default.string,
  inlineLabel: _propTypes2.default.string,
  inlineLabelClass: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  cols: _propTypes2.default.number,
  rows: _propTypes2.default.number
};

TextArea.defaultProps = {
  requiredMark: '*',
  notRequiredMark: null,
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required',
  inlineLabelClass: '',
  value: ''
};

exports.default = TextArea;
module.exports = exports['default'];
//# sourceMappingURL=TextArea.js.map