"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
      options = props.options,
      required = props.required,
      requiredClass = props.requiredClass,
      requiredMark = props.requiredMark,
      emptyLabel = props.emptyLabel;


  var containerClasses = controlGroupClass;
  if (props.isValid && props.isValidated) {
    containerClasses += " " + successWrapperClass;
  }
  if (!props.isValid) {
    containerClasses += " " + errorWrapperClass;
  }

  var emptyOption = emptyLabel ? [_react2.default.createElement(
    "option",
    { key: "empty", value: "" },
    emptyLabel
  )] : [];
  var optionsList = emptyOption.concat(options.map(function (o, index) {
    var option = o;
    if (typeof option === 'string') {
      option = { label: option, value: option };
    }
    return _react2.default.createElement(
      "option",
      { key: index, value: option.value },
      option.label
    );
  }));

  return _react2.default.createElement(
    "div",
    { className: containerClasses },
    _react2.default.createElement(
      "label",
      null,
      _react2.default.createElement(
        "span",
        { className: labelClass },
        label,
        required ? _react2.default.createElement(
          "span",
          { className: requiredClass },
          requiredMark
        ) : null
      ),
      _react2.default.createElement(
        "select",
        {
          name: name,
          value: props.value,
          "aria-invalid": !props.isValid,
          "aria-required": required,
          onChange: props.handleChange,
          onKeyDown: props.handleKeyDown,
          onBlur: props.handleChange
        },
        optionsList
      ),
      errorText && !props.isValid ? _react2.default.createElement(
        "div",
        { className: errorTextClass },
        errorText
      ) : null
    )
  );
};

Select.propTypes = {
  isValid: _react.PropTypes.bool,
  isValidated: _react.PropTypes.bool,
  requiredMark: _react.PropTypes.string,
  value: _react.PropTypes.string,
  errorTextClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  successWrapperClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  emptyLabel: _react.PropTypes.string,
  options: _react.PropTypes.array,
  errorText: _react.PropTypes.string,
  handleChange: _react.PropTypes.func,
  required: _react.PropTypes.bool,
  requiredClass: _react.PropTypes.string,
  handleKeyDown: _react.PropTypes.func,
  label: _react.PropTypes.string
};

Select.defaultProps = {
  requiredMark: '*',
  value: '',
  errorWrapperClass: 'form__control-group--error',
  successWrapperClass: 'form__control-group--success',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group'
};

exports.default = Select;
module.exports = exports["default"];
//# sourceMappingURL=Select.js.map