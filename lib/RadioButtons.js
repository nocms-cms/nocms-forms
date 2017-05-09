'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
    containerClasses += ' error-node ' + errorWrapperClass;
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
  isValid: _propTypes2.default.bool,
  isValidated: _propTypes2.default.bool,
  name: _propTypes2.default.string.isRequired,
  successWrapperClass: _propTypes2.default.string,
  errorTextClass: _propTypes2.default.string,
  errorWrapperClass: _propTypes2.default.string,
  labelClass: _propTypes2.default.string,
  controlGroupClass: _propTypes2.default.string,
  requiredClass: _propTypes2.default.string,
  requiredMark: _propTypes2.default.string,
  notRequiredClass: _propTypes2.default.string,
  notRequiredMark: _propTypes2.default.string,
  value: _propTypes2.default.string,
  errorText: _propTypes2.default.string,
  handleChange: _propTypes2.default.func,
  handleKeyDown: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  options: _propTypes2.default.array,
  label: _propTypes2.default.string,
  radioClass: _propTypes2.default.string,
  radioLabelClass: _propTypes2.default.string
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