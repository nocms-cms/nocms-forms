'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  name: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  value: _propTypes2.default.array,
  isValid: _propTypes2.default.bool,
  handleChange: _propTypes2.default.func,
  handleKeyDown: _propTypes2.default.func,
  validate: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  children: _propTypes2.default.array
};

MultipleSelect.defaultProps = {
  value: []
};

exports.default = MultipleSelect;
module.exports = exports['default'];
//# sourceMappingURL=MultipleSelect.js.map