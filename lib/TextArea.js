'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var stores = require('nocms-stores');
var utils = require('nocms-utils');
var Validator = require('nocms-validation');

var TextArea = function (_React$Component) {
  _inherits(TextArea, _React$Component);

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
      if (utils.isBrowser()) {
        stores.subscribe(this.props.store, this.handleStoreChange);
        var initialState = {};
        initialState[this.props.name] = {
          value: this.props.value,
          isValid: true,
          isValidated: !this.props.required,
          validate: this.validate
        };
        stores.update(this.props.store, initialState);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (utils.isBrowser()) {
        stores.unsubscribe(this.props.store, this.handleStoreChange);
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
      stores.update(this.props.store, state);
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (this.props.validate || this.props.required) {
        var isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
        var state = {};
        state[this.props.name] = {
          value: this.state.value,
          isValid: isValid,
          isValidated: true
        };
        stores.update(this.props.store, state);
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

      return React.createElement(
        'div',
        { className: containerClasses },
        React.createElement(
          'label',
          { id: labelId },
          React.createElement(
            'span',
            { className: labelClass },
            label,
            required ? React.createElement(
              'span',
              { className: requiredClass },
              requiredMark
            ) : null
          ),
          React.createElement('textarea', {
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
          errorText && !this.state.isValid ? React.createElement(
            'div',
            { className: errorTextClass },
            errorText
          ) : null
        )
      );
    }
  }]);

  return TextArea;
}(React.Component);

exports.default = TextArea;


TextArea.propTypes = {
  errorTextClass: React.PropTypes.string,
  labelClass: React.PropTypes.string,
  successWrapperClass: React.PropTypes.string,
  errorWrapperClass: React.PropTypes.string,
  controlGroupClass: React.PropTypes.string,
  validate: React.PropTypes.string,
  required: React.PropTypes.bool,
  requiredClass: React.PropTypes.string,
  store: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  errorText: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  labelId: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  requiredMark: React.PropTypes.string,
  inlineLabel: React.PropTypes.string,
  inlineLabelClass: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  placeholder: React.PropTypes.string
};

TextArea.defaultProps = {
  requiredMark: '*',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  requiredClass: 'form__label--required',
  inlineLabelClass: '',
  maxLength: ''
};
module.exports = exports['default'];
//# sourceMappingURL=TextArea.js.map