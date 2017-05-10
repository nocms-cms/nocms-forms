'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Checkbox = require('./helpers/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultipleCheckbox = function MultipleCheckbox(props) {
  var controlGroupClass = props.controlGroupClass,
      inlineLabel = props.inlineLabel,
      inlineLabelClass = props.inlineLabelClass,
      checkboxClass = props.checkboxClass,
      labelId = props.labelId,
      labelClass = props.labelClass,
      label = props.label,
      handleChange = props.handleChange,
      value = props.value;


  var containerClasses = controlGroupClass + ' ' + checkboxClass;
  if (inlineLabel) {
    containerClasses += ' ' + inlineLabelClass;
  }

  var toggleCheckbox = function toggleCheckbox(e) {
    handleChange(e);
  };
  var createCheckboxes = props.options.map(function (option, idx) {
    return _react2.default.createElement(_Checkbox2.default, {
      label: option.label,
      value: option.value,
      checkedValues: value,
      name: props.name,
      handleCheckboxChange: toggleCheckbox,
      key: idx,
      labelClass: labelClass
    });
  });

  return _react2.default.createElement(
    'div',
    { className: containerClasses },
    _react2.default.createElement(
      'fieldset',
      null,
      _react2.default.createElement(
        'legend',
        { id: labelId },
        label
      ),
      createCheckboxes
    )
  );
};

MultipleCheckbox.propTypes = {
  handleChange: _propTypes2.default.func.isRequired,
  name: _propTypes2.default.string.isRequired,
  labelClass: _propTypes2.default.string,
  controlGroupClass: _propTypes2.default.string,
  inlineLabel: _propTypes2.default.bool,
  inlineLabelClass: _propTypes2.default.string,
  checkboxClass: _propTypes2.default.string,
  label: _propTypes2.default.string,
  labelId: _propTypes2.default.string,
  options: _propTypes2.default.array,
  value: _propTypes2.default.array
};

MultipleCheckbox.defaultProps = {
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  checkboxClass: 'form__multi-checkbox',
  value: []
};

exports.default = MultipleCheckbox;
module.exports = exports['default'];
//# sourceMappingURL=MultipleCheckbox.js.map