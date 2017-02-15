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

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleEnterKey = _this.handleEnterKey.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.validate = _this.validate.bind(_this);
    _this.state = {
      value: props.value || '',
      isValid: true,
      isValidated: false,
      convertDate: props.type === 'date'
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_nocmsUtils2.default.isBrowser()) {
        _nocmsStores2.default.subscribe(this.props.store, this.handleStoreChange);
        var store = _nocmsStores2.default.getStore(this.props.store);
        var initialState = store[this.props.name];
        var inputState = {};
        inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate };

        if (typeof initialState === 'undefined' || initialState === null) {
          inputState[this.props.name].value = this.props.value || '';
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
      if (global.environment !== 'server') {
        _nocmsStores2.default.unsubscribe(this.props.store, this.handleStoreChange);
        if (this.props.deleteOnUnmount) {
          var inputState = {};
          inputState[this.props.name] = undefined;
          _nocmsStores2.default.update(this.props.store, inputState);
        }
      }
    }
  }, {
    key: 'handleDependentState',
    value: function handleDependentState(store, changes) {
      if (this.props.dependOn) {
        var fields = this.props.dependOn.split(',').map(function (f) {
          return f.trim();
        });
        var values = {};

        // Check if any of the changed values are in the dependOn list
        var doUpdate = fields.reduce(function (val, f) {
          values[f] = store[f];
          if (changes[f]) {
            return true;
          }
          return val;
        }, false);

        if (!doUpdate) {
          return false;
        }

        var aggregatedValue = this.props.dependencyFunc(values);
        var aggregatedState = { value: aggregatedValue, isValid: true, isValidated: true };
        this.setState(aggregatedState);
        this.updateStore(aggregatedValue, true, true);
        return true;
      }
      return false;
    }
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(store, changes) {
      if (this.handleDependentState(store, changes)) {
        return;
      }

      var newState = store[this.props.name];
      if ((typeof newState === 'undefined' ? 'undefined' : _typeof(newState)) !== 'object') {
        // Upgrade simple data values to input state in store
        newState = {
          value: newState,
          isValid: true,
          isValidated: false
        };
      }
      this.setState(newState);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var value = this.props.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;
      this.updateStore(value, true, this.state.isValidated);
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
    key: 'handleBlur',
    value: function handleBlur(e) {
      e.stopPropagation();
      this.validate();
    }
  }, {
    key: 'updateStore',
    value: function updateStore(value, isValid, isValidated) {
      var state = {};
      state[this.props.name] = {
        value: value,
        isValid: isValid,
        isValidated: isValidated,
        validate: this.validate,
        convertDate: this.props.type === 'date'
      };

      _nocmsStores2.default.update(this.props.store, state);
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (this.props.validate || this.props.required) {
        var isValid = _nocmsValidation2.default.validate(this.state.value, this.props.validate, this.props.required);
        this.updateStore(this.state.value, isValid, true);

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
          type = _props.type,
          errorText = _props.errorText,
          errorTextClass = _props.errorTextClass,
          errorWrapperClass = _props.errorWrapperClass,
          inlineLabelClass = _props.inlineLabelClass,
          checkboxClass = _props.checkboxClass,
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


      if (type === 'hidden') {
        return _react2.default.createElement('input', { type: 'hidden', value: this.state.value, name: name });
      }

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
      if (type === 'checkbox') {
        containerClasses += ' ' + checkboxClass;
      }
      return _react2.default.createElement(
        'div',
        { className: containerClasses },
        inlineLabel && errorText && !this.state.isValid ? _react2.default.createElement(
          'div',
          { className: errorTextClass },
          errorText
        ) : null,
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
          _react2.default.createElement('input', {
            type: type,
            autoComplete: 'off',
            maxLength: maxLength,
            name: name,
            value: this.state.value,
            disabled: disabled,
            placeholder: placeholder,
            'aria-invalid': !this.state.isValid,
            'aria-required': required,
            onChange: this.handleChange,
            onClick: type === 'checkbox' ? this.handleChange : null,
            onKeyDown: this.handleEnterKey,
            onBlur: this.handleBlur
          }),
          !inlineLabel && errorText && !this.state.isValid ? _react2.default.createElement(
            'div',
            { className: ' ' + errorTextClass },
            errorText
          ) : null
        )
      );
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = {
  name: _react.PropTypes.string.isRequired,
  store: _react.PropTypes.string.isRequired,
  type: _react.PropTypes.string,
  value: _react.PropTypes.string,
  successWrapperClass: _react.PropTypes.string,
  errorTextClass: _react.PropTypes.string,
  errorWrapperClass: _react.PropTypes.string,
  labelClass: _react.PropTypes.string,
  controlGroupClass: _react.PropTypes.string,
  required: _react.PropTypes.bool,
  requiredClass: _react.PropTypes.string,
  deleteOnUnmount: _react.PropTypes.bool,
  validate: _react.PropTypes.string,
  inlineLabel: _react.PropTypes.bool,
  inlineLabelClass: _react.PropTypes.string,
  checkboxClass: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  label: _react.PropTypes.string,
  requiredMark: _react.PropTypes.string,
  maxLength: _react.PropTypes.number,
  disabled: _react.PropTypes.bool,
  placeholder: _react.PropTypes.string,
  labelId: _react.PropTypes.string,
  dependOn: _react.PropTypes.string,
  dependencyFunc: _react.PropTypes.func
};

Input.defaultProps = {
  successWrapperClass: 'form__control-group--success',
  errorWrapperClass: 'form__control-group--error',
  requiredMark: '*',
  type: 'text',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
  inlineLabelClass: '',
  requiredClass: 'form__label--required',
  required: false,
  disabled: false,
  placeholder: ''
};

exports.default = Input;
module.exports = exports['default'];
//# sourceMappingURL=Input.js.map