'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioButtons = function RadioButtons(props) {
  var controlGroupClass = props.controlGroupClass,
      successWrapperClass = props.successWrapperClass,
      errorText = props.errorText,
      errorTextClass = props.errorTextClass,
      errorWrapperClass = props.errorWrapperClass,
      labelClass = props.labelClass,
      label = props.label,
      required = props.required,
      requiredMark = props.requiredMark,
      notRequiredClass = props.notRequiredClass,
      notRequiredMark = props.notRequiredMark,
      name = props.name,
      options = props.options,
      radioClass = props.radioClass,
      requiredClass = props.requiredClass,
      radioLabelClass = props.radioLabelClass,
      value = props.value,
      handleChange = props.handleChange;


  var containerClasses = ' ' + controlGroupClass + ' ' + radioClass;
  if (props.isValid && props.isValidated) {
    containerClasses += ' ' + successWrapperClass;
  }
  if (!props.isValid) {
    containerClasses += ' ' + errorWrapperClass;
  }
  var radios = options.map(function (o, index) {
    var option = o;
    if (typeof option === 'string') {
      option = { label: option, value: option };
    }
    var labelClasses = labelClass;
    if (option.disabled) {
      labelClasses += ' ' + labelClass + '--disabled';
    }
    return _react2.default.createElement(
      'label',
      { key: name + '_' + index, className: labelClasses },
      _react2.default.createElement('input', {
        checked: value === option.value,
        type: 'radio',
        value: option.value,
        name: name,
        disabled: option.disabled,
        onChange: handleChange,
        onClick: handleChange,
        onKeyDown: props.handleKeyDown
      }),
      _react2.default.createElement(
        'span',
        { className: radioLabelClass },
        option.label
      )
    );
  });
  return _react2.default.createElement(
    'div',
    { className: containerClasses },
    _react2.default.createElement(
      'fieldset',
      null,
      _react2.default.createElement(
        'legend',
        null,
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
      radios,
      errorText && !props.isValid ? _react2.default.createElement(
        'div',
        { className: errorTextClass },
        props.errorText
      ) : null
    )
  );
};

RadioButtons.propTypes = {
  isValid: _react.PropTypes.bool,
  isValidated: _react.PropTypes.bool,
  name: _react.PropTypes.string.isRequired,
  successWrapperClass: _react.PropTypes.string,
  errorTextClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  requiredClass: _react.PropTypes.string,
  requiredMark: _react.PropTypes.string,
  notRequiredClass: _react.PropTypes.string,
  notRequiredMark: _react.PropTypes.string,
  value: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  handleChange: _react.PropTypes.func,
  handleKeyDown: _react.PropTypes.func,
  required: _react.PropTypes.bool,
  options: _react.PropTypes.array,
  label: _react.PropTypes.string,
  radioClass: _react.PropTypes.string,
  radioLabelClass: _react.PropTypes.string
};

RadioButtons.defaultProps = {
  required: false,
  requiredMark: '*',
  notRequiredMark: null,
  errorTextClass: 'form__error-text',
  controlGroupClass: 'form__control-group',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  radioClass: 'form__control-group--radio',
  labelClass: 'form__label',
  radioLabelClass: 'form__radio-label',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required'
};

exports.default = RadioButtons;
module.exports = exports['default'];
//# sourceMappingURL=RadioButtons.js.map