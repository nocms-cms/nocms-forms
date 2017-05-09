'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MultipleSelect = require('./MultipleSelect');

var _MultipleSelect2 = _interopRequireDefault(_MultipleSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function Select(props) {
  var controlGroupClass = props.controlGroupClass,
      successWrapperClass = props.successWrapperClass,
      errorText = props.errorText,
      errorTextClass = props.errorTextClass,
      errorWrapperClass = props.errorWrapperClass,
      labelClass = props.labelClass,
      label = props.label,
      name = props.name,
      value = props.value,
      isValid = props.isValid,
      disabled = props.disabled,
      options = props.options,
      required = props.required,
      requiredClass = props.requiredClass,
      requiredMark = props.requiredMark,
      notRequiredMark = props.notRequiredMark,
      notRequiredClass = props.notRequiredClass,
      emptyLabel = props.emptyLabel,
      multiple = props.multiple,
      handleChange = props.handleChange,
      handleKeyDown = props.handleKeyDown,
      validate = props.validate;


  var containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
    containerClasses += ' ' + successWrapperClass;
  }
  if (!props.isValid) {
    containerClasses += ' error-node ' + errorWrapperClass;
  }

  var emptyOption = emptyLabel && !multiple ? [_react2.default.createElement(
    'option',
    { key: 'empty', value: '' },
    emptyLabel
  )] : [];
  var optionsList = emptyOption.concat(options.map(function (o, index) {
    var option = o;
    if (typeof option === 'string') {
      option = { label: option, value: option };
    }
    return _react2.default.createElement(
      'option',
      { key: index, value: option.value },
      option.label
    );
  }));

  return _react2.default.createElement(
    'div',
    { className: containerClasses },
    _react2.default.createElement(
      'label',
      null,
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
      multiple ? _react2.default.createElement(
        _MultipleSelect2.default,
        { name: name, disabled: disabled, value: value, handleChange: props.handleChange, onKeyDown: handleKeyDown, onBlur: props.validate },
        optionsList
      ) : _react2.default.createElement(
        'select',
        {
          name: name,
          disabled: disabled,
          value: value,
          'aria-invalid': !isValid,
          'aria-required': required,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
          onBlur: validate
        },
        optionsList
      ),
      errorText && !isValid ? _react2.default.createElement(
        'div',
        { className: errorTextClass },
        errorText
      ) : null
    )
  );
};

Select.propTypes = {
  isValid: _propTypes2.default.bool,
  isValidated: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  requiredMark: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  errorTextClass: _propTypes2.default.string,
  errorWrapperClass: _propTypes2.default.string,
  successWrapperClass: _propTypes2.default.string,
  labelClass: _propTypes2.default.string,
  controlGroupClass: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  emptyLabel: _propTypes2.default.string,
  options: _propTypes2.default.array,
  errorText: _propTypes2.default.string,
  handleChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  requiredClass: _propTypes2.default.string,
  notRequiredClass: _propTypes2.default.string,
  notRequiredMark: _propTypes2.default.string,
  handleKeyDown: _propTypes2.default.func,
  label: _propTypes2.default.string,
  validate: _propTypes2.default.func,
  multiple: _propTypes2.default.bool
};

Select.defaultProps = {
  requiredMark: '*',
  notRequiredMark: null,
  errorWrapperClass: 'form__control-group--error',
  successWrapperClass: 'form__control-group--success',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  notRequiredClass: 'form__label--not-required'
};

exports.default = Select;
module.exports = exports['default'];
//# sourceMappingURL=Select.js.map