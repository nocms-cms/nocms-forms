'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nocmsValidation = require('nocms-validation');

var _nocmsValidation2 = _interopRequireDefault(_nocmsValidation);

var _nocmsUtils = require('nocms-utils');

var _nocmsUtils2 = _interopRequireDefault(_nocmsUtils);

var _nocmsStores = require('nocms-stores');

var _nocmsStores2 = _interopRequireDefault(_nocmsStores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = function (_Component) {
  _inherits(TextArea, _Component);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      value: props.value,
      isValid: true,
      isValidated: false
    };
    _this.validate = _this.validate.bind(_this);
    return _this;
  }

  _createClass(TextArea, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_nocmsUtils2.default.isBrowser()) {
        _nocmsStores2.default.subscribe(this.props.store, this.handleStoreChange);
        var initialState = {};
        initialState[this.props.name] = {
          value: this.props.value,
          isValid: true,
          isValidated: !this.props.required,
          validate: this.validate
        };
        _nocmsStores2.default.update(this.props.store, initialState);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_nocmsUtils2.default.isBrowser()) {
        _nocmsStores2.default.unsubscribe(this.props.store, this.handleStoreChange);
      }
    }
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(store) {
      this.setState(store[this.props.name]);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var data = {};
      data[this.props.name] = { value: e.currentTarget.value, isValid: true };
      var state = {};
      state[this.props.name] = {
        value: e.currentTarget.value,
        isValid: true,
        isValidated: this.state.isValidated,
        validate: this.validate
      };
      _nocmsStores2.default.update(this.props.store, state);
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (this.props.validate || this.props.required) {
        var isValid = _nocmsValidation2.default.validate(this.state.value, this.props.validate, this.props.required);
        var state = {};
        state[this.props.name] = {
          value: this.state.value,
          isValid: isValid,
          isValidated: true
        };
        _nocmsStores2.default.update(this.props.store, state);
        return isValid;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          controlGroupClass = _props.controlGroupClass,
          successWrapperClass = _props.successWrapperClass,
          inlineLabel = _props.inlineLabel,
          errorText = _props.errorText,
          errorTextClass = _props.errorTextClass,
          errorWrapperClass = _props.errorWrapperClass,
          inlineLabelClass = _props.inlineLabelClass,
          labelId = _props.labelId,
          labelClass = _props.labelClass,
          label = _props.label,
          required = _props.required,
          requiredClass = _props.requiredClass,
          requiredMark = _props.requiredMark,
          maxLength = _props.maxLength,
          name = _props.name,
          disabled = _props.disabled,
          placeholder = _props.placeholder;


      var containerClasses = controlGroupClass;
      if (this.state.isValid && this.state.isValidated) {
        containerClasses += ' ' + successWrapperClass;
      }
      if (!this.state.isValid) {
        containerClasses += ' ' + errorWrapperClass;
      }
      if (inlineLabel) {
        containerClasses += ' ' + inlineLabelClass;
      }

      return _react2.default.createElement(
        'div',
        { className: containerClasses },
        _react2.default.createElement(
          'label',
          { id: labelId },
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
          _react2.default.createElement('textarea', {
            name: name,
            'aria-invalid': !this.state.isValid,
            'aria-required': required,
            onChange: this.handleChange,
            onBlur: this.validate,
            maxLength: maxLength,
            value: this.state.value,
            disabled: disabled,
            placeholder: placeholder
          }),
          errorText && !this.state.isValid ? _react2.default.createElement(
            'div',
            { className: errorTextClass },
            errorText
          ) : null
        )
      );
    }
  }]);

  return TextArea;
}(_react.Component);

exports.default = TextArea;


TextArea.propTypes = {
  errorTextClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  successWrapperClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  validate: _react.PropTypes.string,
  required: _react.PropTypes.bool,
  requiredClass: _react.PropTypes.string,
  store: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.string,
  labelId: _react.PropTypes.string,
  maxLength: _react.PropTypes.number,
  requiredMark: _react.PropTypes.string,
  inlineLabel: _react.PropTypes.string,
  inlineLabelClass: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  placeholder: _react.PropTypes.string
};

TextArea.defaultProps = {
  requiredMark: '*',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  inlineLabelClass: ''
};
module.exports = exports['default'];
//# sourceMappingURL=TextArea.js.map