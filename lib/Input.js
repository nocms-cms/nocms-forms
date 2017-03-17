'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(props) {
  var controlGroupClass = props.controlGroupClass,
      successWrapperClass = props.successWrapperClass,
      inlineLabel = props.inlineLabel,
      type = props.type,
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
      readOnly = props.readOnly,
      placeholder = props.placeholder;


  if (type === 'hidden') {
    return _react2.default.createElement('input', { type: 'hidden', value: props.value, name: name });
  }

  var containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
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
    inlineLabel && errorText && !props.isValid ? _react2.default.createElement(
      'div',
      { className: errorTextClass },
      errorText
    ) : null,
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
      _react2.default.createElement('input', {
        type: type === 'date' ? 'text' : type,
        autoComplete: 'off',
        maxLength: maxLength,
        name: name,
        value: props.value,
        disabled: disabled ? true : null,
        readOnly: readOnly ? true : null,
        placeholder: placeholder,
        'aria-invalid': !props.isValid,
        'aria-required': required,
        onChange: props.handleChange,
        onKeyDown: props.handleKeyDown,
        onBlur: props.validate
      }),
      !inlineLabel && errorText && !props.isValid ? _react2.default.createElement(
        'div',
        { className: ' ' + errorTextClass },
        errorText
      ) : null
    )
  );
};

Input.propTypes = {
  handleChange: _react.PropTypes.func,
  isValid: _react.PropTypes.bool,
  isValidated: _react.PropTypes.bool,
  name: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.string,
  value: _react.PropTypes.string,
  successWrapperClass: _react.PropTypes.string,
  errorTextClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  required: _react.PropTypes.bool,
  requiredClass: _react.PropTypes.string,
  requiredMark: _react.PropTypes.string,
  notRequiredClass: _react.PropTypes.string,
  notRequiredMark: _react.PropTypes.string,
  validate: _react.PropTypes.func,
  handleKeyDown: _react.PropTypes.func,
  inlineLabel: _react.PropTypes.bool,
  inlineLabelClass: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  label: _react.PropTypes.string,
  maxLength: _react.PropTypes.number,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  placeholder: _react.PropTypes.string,
  labelId: _react.PropTypes.string
};

Input.defaultProps = {
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  requiredMark: '*',
  notRequiredMark: null,
  type: 'text',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required',
  required: false,
  disabled: false,
  placeholder: '',
  value: ''
};

exports.default = Input;
module.exports = exports['default'];
//# sourceMappingURL=Input.js.map