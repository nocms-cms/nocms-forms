'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hidden = function Hidden(props) {
  var name = props.name,
      value = props.value;


  return _react2.default.createElement('input', { type: 'hidden', value: value, name: name });
};

Hidden.propTypes = {
  name: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.string
};

Hidden.defaultProps = {
  value: ''
};

exports.default = Hidden;
module.exports = exports['default'];
//# sourceMappingURL=Hidden.js.map