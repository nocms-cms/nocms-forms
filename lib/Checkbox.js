'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function Checkbox(props) {
  var controlGroupClass = props.controlGroupClass,
      successWrapperClass = props.successWrapperClass,
      inlineLabel = props.inlineLabel,
      type = props.type,
      errorText = props.errorText,
      errorTextClass = props.errorTextClass,
      errorWrapperClass = props.errorWrapperClass,
      inlineLabelClass = props.inlineLabelClass,
      checkboxClass = props.checkboxClass,
      labelId = props.labelId,
      labelClass = props.labelClass,
      label = props.label,
      required = props.required,
      requiredClass = props.requiredClass,
      requiredMark = props.requiredMark,
      name = props.name,
      disabled = props.disabled;


  var containerClasses = controlGroupClass + ' ' + checkboxClass;
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
      _react2.default.createElement('input', {
        type: type,
        autoComplete: 'off',
        name: name,
        checked: props.value ? 'checked' : null,
        value: props.value,
        disabled: props.disabled ? true : null,
        'aria-invalid': !props.isValid,
        'aria-required': required,
        onChange: props.handleChange,
        onClick: props.handleChange,
        onKeyDown: props.handleKeyDown,
        onBlur: props.validate
      }),
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
      !inlineLabel && errorText && !props.isValid ? _react2.default.createElement(
        'div',
        { className: ' ' + errorTextClass },
        errorText
      ) : null
    )
  );
};

Checkbox.propTypes = {
  handleChange: _react.PropTypes.func,
  isValid: _react.PropTypes.bool,
  isValidated: _react.PropTypes.bool,
  name: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.string,
  value: _react.PropTypes.bool,
  successWrapperClass: _react.PropTypes.string,
  errorTextClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  required: _react.PropTypes.bool,
  requiredClass: _react.PropTypes.string,
  validate: _react.PropTypes.func,
  handleKeyDown: _react.PropTypes.func,
  inlineLabel: _react.PropTypes.bool,
  inlineLabelClass: _react.PropTypes.string,
  checkboxClass: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  label: _react.PropTypes.string,
  requiredMark: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  labelId: _react.PropTypes.string
};

Checkbox.defaultProps = {
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  requiredMark: '*',
  type: 'text',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  requiredClass: 'form__label--required',
  required: false,
  disabled: false,
  placeholder: ''
};

exports.default = Checkbox;
module.exports = exports['default'];
//# sourceMappingURL=Checkbox.js.map