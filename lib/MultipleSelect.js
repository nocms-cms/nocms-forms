'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultipleSelect = function MultipleSelect(props) {
  var name = props.name,
      disabled = props.disabled,
      value = props.value,
      isValid = props.isValid,
      required = props.required,
      handleChange = props.handleChange,
      handleKeyDown = props.handleKeyDown,
      validate = props.validate,
      children = props.children;

  return _react2.default.createElement(
    'select',
    {
      name: name,
      disabled: disabled,
      value: value,
      'aria-invalid': !isValid,
      'aria-required': required,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onBlur: validate,
      multiple: true
    },
    children
  );
};

MultipleSelect.propTypes = {
  name: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  value: _react.PropTypes.array,
  isValid: _react.PropTypes.bool,
  handleChange: _react.PropTypes.func,
  handleKeyDown: _react.PropTypes.func,
  validate: _react.PropTypes.func,
  required: _react.PropTypes.bool,
  children: _react.PropTypes.array
};

MultipleSelect.defaultProps = {
  value: []
};

exports.default = MultipleSelect;
module.exports = exports['default'];
//# sourceMappingURL=MultipleSelect.js.map