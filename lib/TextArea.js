'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
      maxLength = props.maxLength,
      name = props.name,
      disabled = props.disabled,
      placeholder = props.placeholder,
      handleChange = props.handleChange,
      isValid = props.isValid,
      isValidated = props.isValidated;


  var containerClasses = controlGroupClass;
  if (isValid && isValidated) {
    containerClasses += ' ' + successWrapperClass;
  }
  if (!props.isValid) {
    containerClasses += ' ' + errorWrapperClass;
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
        required ? _react2.default.createElement(
          'span',
          { className: requiredClass },
          requiredMark
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
        placeholder: placeholder
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
  errorTextClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  successWrapperClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  validate: _react.PropTypes.func,
  handleChange: _react.PropTypes.func,
  required: _react.PropTypes.bool,
  isValidated: _react.PropTypes.bool,
  isValid: _react.PropTypes.bool,
  requiredClass: _react.PropTypes.string,
  value: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string,
  labelId: _react.PropTypes.string,
  maxLength: _react.PropTypes.number,
  requiredMark: _react.PropTypes.string,
  inlineLabel: _react.PropTypes.string,
  inlineLabelClass: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  placeholder: _react.PropTypes.string
};

TextArea.defaultProps = {
  requiredMark: '*',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  inlineLabelClass: '',
  value: ''
};

exports.default = TextArea;
module.exports = exports['default'];
//# sourceMappingURL=TextArea.js.map