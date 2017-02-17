'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var RadioButtons = function (_Component) {
  _inherits(RadioButtons, _Component);

  function RadioButtons(props) {
    _classCallCheck(this, RadioButtons);

    var _this = _possibleConstructorReturn(this, (RadioButtons.__proto__ || Object.getPrototypeOf(RadioButtons)).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleEnterKey = _this.handleEnterKey.bind(_this);
    _this.validate = _this.validate.bind(_this);

    _this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
      validate: _this.validate
    };
    return _this;
  }

  _createClass(RadioButtons, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_nocmsUtils2.default.isBrowser()) {
        _nocmsStores2.default.subscribe(this.props.store, this.handleStoreChange);
        var store = _nocmsStores2.default.getStore(this.props.store);
        var initialState = store[this.props.name];
        var inputState = {};
        inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate };

        if (typeof initialState === 'undefined') {
          inputState[this.props.name].value = this.props.value;
        } else if ((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) !== 'object') {
          inputState[this.props.name].value = initialState;
        } else {
          inputState = initialState;
        }
        _nocmsStores2.default.update(this.props.store, inputState);
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
      var state = {};
      state[this.props.name] = {
        value: e.currentTarget.value,
        isValid: true,
        isValidated: this.state.isValidated,
        validate: this.validate
      };
      _nocmsStores2.default.update(this.props.store, state);
      if (this.props.onChange) {
        this.props.onChange(e, e.currentTarget.value);
      }
    }
  }, {
    key: 'handleEnterKey',
    value: function handleEnterKey(e) {
      if (e.keyCode === 13) {
        // Enter
        this.validate();
      }
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
          isValidated: true,
          validate: this.validate
        };
        _nocmsStores2.default.update(this.props.store, state);
        return isValid;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          controlGroupClass = _props.controlGroupClass,
          successWrapperClass = _props.successWrapperClass,
          errorText = _props.errorText,
          errorTextClass = _props.errorTextClass,
          errorWrapperClass = _props.errorWrapperClass,
          labelClass = _props.labelClass,
          label = _props.label,
          required = _props.required,
          requiredMark = _props.requiredMark,
          name = _props.name,
          options = _props.options,
          radioClass = _props.radioClass,
          requiredClass = _props.requiredClass,
          radioLabelClass = _props.radioLabelClass;


      var containerClasses = ' ' + controlGroupClass + ' ' + radioClass;
      if (this.state.isValid && this.state.isValidated) {
        containerClasses += ' ' + successWrapperClass;
      }
      if (!this.state.isValid) {
        containerClasses += ' ' + errorWrapperClass;
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
            checked: _this2.state.value === option.value,
            type: 'radio',
            value: option.value,
            name: name,
            disabled: option.disabled,
            onChange: _this2.handleChange,
            onClick: _this2.handleChange,
            onKeyDown: _this2.handleEnterKey
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
            required ? _react2.default.createElement(
              'span',
              { className: requiredClass },
              requiredMark
            ) : null
          ),
          radios,
          errorText && !this.state.isValid ? _react2.default.createElement(
            'div',
            { className: errorTextClass },
            this.props.errorText
          ) : null
        )
      );
    }
  }]);

  return RadioButtons;
}(_react.Component);

exports.default = RadioButtons;


RadioButtons.propTypes = {
  name: _react.PropTypes.string.isRequired,
  successWrapperClass: _react.PropTypes.string,
  errorTextClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  requiredClass: _react.PropTypes.string,
  value: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  store: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func,
  required: _react.PropTypes.bool,
  validate: _react.PropTypes.string,
  options: _react.PropTypes.array,
  label: _react.PropTypes.string,
  requiredMark: _react.PropTypes.string,
  radioClass: _react.PropTypes.string,
  radioLabelClass: _react.PropTypes.string
};

RadioButtons.defaultProps = {
  required: false,
  requiredMark: '*',
  errorTextClass: 'form__error-text',
  controlGroupClass: 'form__control-group',
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  radioClass: 'form__control-group--radio',
  labelClass: 'form__label',
  radioLabelClass: 'form__radio-label',
  requiredClass: 'form__label--required'
};
module.exports = exports['default'];
//# sourceMappingURL=RadioButtons.js.map