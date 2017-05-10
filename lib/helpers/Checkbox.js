'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function Checkbox(props) {
  var label = props.label,
      value = props.value,
      name = props.name,
      checkedValues = props.checkedValues,
      handleCheckboxChange = props.handleCheckboxChange;


  var toggleCheckboxChange = function toggleCheckboxChange(e) {
    handleCheckboxChange(e);
  };

  var isChecked = checkedValues.indexOf(value) >= 0;
  return _react2.default.createElement(
    'div',
    { className: 'checkbox' },
    _react2.default.createElement(
      'label',
      null,
      _react2.default.createElement('input', {
        type: 'checkbox',
        autoComplete: 'off',
        value: value,
        name: name,
        checked: isChecked,
        onChange: toggleCheckboxChange
      }),
      label
    )
  );
};

Checkbox.propTypes = {
  label: _propTypes2.default.string.isRequired,
  handleCheckboxChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string,
  name: _propTypes2.default.string,
  checkedValues: _propTypes2.default.array
};

exports.default = Checkbox;
module.exports = exports['default'];
//# sourceMappingURL=Checkbox.js.map