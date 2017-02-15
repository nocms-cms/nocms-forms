'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var stores = require('nocms-stores');
var utils = require('nocms-utils');
var Validator = require('nocms-validation');

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleEnterKey = _this.handleEnterKey.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.validate = _this.validate.bind(_this);

    _this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
      validate: _this.validate
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          store = _props.store,
          name = _props.name,
          value = _props.value,
          required = _props.required;

      if (utils.isBrowser()) {
        stores.subscribe(store, this.handleStoreChange);
        var storeObj = stores.getStore(store);
        var initialState = storeObj[name];
        var inputState = {};
        inputState[name] = { isValid: true, isValidated: !required, validate: this.validate };
        if (typeof initialState === 'undefined') {
          inputState[name].value = value;
        } else if ((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) !== 'object') {
          inputState[name].value = initialState;
        } else {
          inputState = initialState;
        }
        stores.update(store, inputState);
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
      var state = {};
      state[this.props.name] = {
        value: e.currentTarget.value,
        isValid: true,
        isValidated: this.state.isValidated,
        validate: this.validate
      };
      stores.update(this.props.store, state);
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
    key: 'handleBlur',
    value: function handleBlur(e) {
      e.stopPropagation();
      this.validate();
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
          isValidated: true,
          validate: this.validate
        };
        stores.update(this.props.store, state);
        return isValid;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          controlGroupClass = _props2.controlGroupClass,
          successWrapperClass = _props2.successWrapperClass,
          errorText = _props2.errorText,
          errorTextClass = _props2.errorTextClass,
          errorWrapperClass = _props2.errorWrapperClass,
          labelClass = _props2.labelClass,
          label = _props2.label,
          name = _props2.name,
          options = _props2.options,
          required = _props2.required,
          requiredClass = _props2.requiredClass,
          requiredMark = _props2.requiredMark,
          emptyLabel = _props2.emptyLabel;


      var containerClasses = controlGroupClass;
      if (this.state.isValid && this.state.isValidated) {
        containerClasses += ' ' + successWrapperClass;
      }
      if (!this.state.isValid) {
        containerClasses += ' ' + errorWrapperClass;
      }

      var emptyOption = emptyLabel ? [React.createElement(
        'option',
        { key: 'empty', value: '' },
        emptyLabel
      )] : [];
      var optionsList = emptyOption.concat(options.map(function (o, index) {
        var option = o;
        if (typeof option === 'string') {
          option = { label: option, value: option };
        }
        return React.createElement(
          'option',
          { key: index, value: option.value },
          option.label
        );
      }));

      return React.createElement(
        'div',
        { className: containerClasses },
        React.createElement(
          'label',
          null,
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
          React.createElement(
            'select',
            {
              name: name,
              value: this.state.value,
              'aria-invalid': !this.state.isValid,
              'aria-required': required,
              onChange: this.handleChange,
              onKeyDown: this.handleEnterKey,
              onBlur: this.handleBlur
            },
            optionsList
          ),
          errorText && !this.state.isValid ? React.createElement(
            'div',
            { className: errorTextClass },
            errorText
          ) : null
        )
      );
    }
  }]);

  return Select;
}(React.Component);

exports.default = Select;


Select.propTypes = {
  requiredMark: React.PropTypes.string,
  value: React.PropTypes.string,
  errorTextClass: React.PropTypes.string,
  errorWrapperClass: React.PropTypes.string,
  successWrapperClass: React.PropTypes.string,
  labelClass: React.PropTypes.string,
  controlGroupClass: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  emptyLabel: React.PropTypes.string,
  store: React.PropTypes.string,
  options: React.PropTypes.array,
  errorText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  requiredClass: React.PropTypes.string,
  validate: React.PropTypes.string,
  label: React.PropTypes.string
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
module.exports = exports['default'];
//# sourceMappingURL=Select.js.map