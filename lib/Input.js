'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nocmsValidation = require('nocms-validation');

var _nocmsValidation2 = _interopRequireDefault(_nocmsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stores = require('nocms-stores');

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleEnterKey = _this.handleEnterKey.bind(_this);
    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
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
      if (global.environment !== 'server') {
        stores.subscribe(this.props.store, this.handleStoreChange);
        var store = stores.getStore(this.props.store);
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

        stores.update(this.props.store, inputState);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (global.environment !== 'server') {
        stores.unsubscribe(this.props.store, this.handleStoreChange);
        if (this.props.deleteOnUnmount) {
          var inputState = {};
          inputState[this.props.name] = undefined;
          stores.update(this.props.store, inputState);
        }
      }
    }
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(store) {
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
      var data = {};
      var value = this.props.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;

      data[this.props.name] = { value: value, isValid: true };
      var state = {};
      state[this.props.name] = {
        value: value,
        isValid: true,
        isValidated: this.state.isValidated,
        validate: this.validate,
        convertDate: this.props.type === 'date'
      };

      stores.update(this.props.store, state);
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
        var isValid = _nocmsValidation2.default.validate(this.state.value, this.props.validate, this.props.required);
        var state = {};
        state[this.props.name] = {
          value: this.state.value,
          isValid: isValid,
          isValidated: true,
          convertDate: this.props.type === 'date'
        };
        stores.update(this.props.store, state);
        return isValid;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var type = this.props.type || 'text';
      var classes = this.state.isValid ? '' : 'form__error';
      var containerClasses = 'form__control-group' + (!this.state.isValid ? ' form__error' : '') + (this.props.inlineLabel ? ' inline-label' : '');
      var isRequiredLabelClass = this.props.required ? 'form__label-required' : '';
      return _react2.default.createElement(
        'div',
        { className: containerClasses },
        this.props.inlineLabel && this.props.errorText && !this.state.isValid ? _react2.default.createElement(
          'div',
          { className: 'form__error-text' },
          this.props.errorText
        ) : null,
        _react2.default.createElement(
          'label',
          { id: this.props.labelId },
          _react2.default.createElement(
            'span',
            { className: 'form__label' },
            this.props.label
          ),
          ' ',
          this.props.required ? _react2.default.createElement(
            'span',
            { className: isRequiredLabelClass },
            this.props.requiredMark
          ) : null,
          _react2.default.createElement('input', {
            className: classes,
            type: type,
            autoComplete: 'off',
            maxLength: this.props.maxLength,
            name: this.props.name,
            value: this.state.value,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder ? this.props.placeholder : '',
            'aria-invalid': !this.state.isValid,
            'aria-required': this.props.required,
            onFocus: this.handleFocus,
            onChange: this.handleChange,
            onClick: this.props.type === 'checkbox' ? this.handleChange : null,
            onKeyDown: this.handleEnterKey,
            onBlur: this.handleBlur
          }),
          !this.props.inlineLabel && this.props.errorText && !this.state.isValid ? _react2.default.createElement(
            'div',
            { className: 'form__error-text' },
            this.props.errorText
          ) : null
        )
      );
    }
  }]);

  return Input;
}(_react.Component);

Input.propTypes = {
  value: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  store: _react2.default.PropTypes.string.isRequired,
  required: _react2.default.PropTypes.bool,
  deleteOnUnmount: _react2.default.PropTypes.bool,
  validate: _react2.default.PropTypes.string,
  inlineLabel: _react2.default.PropTypes.bool,
  errorText: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  requiredMark: _react2.default.PropTypes.string,
  maxLength: _react2.default.PropTypes.number,
  disabled: _react2.default.PropTypes.bool,
  placeholder: _react2.default.PropTypes.string,
  labelId: _react2.default.PropTypes.string
};

Input.defaultProps = {
  requiredMark: '*',
  type: 'text',
  required: false,
  disabled: false
};

exports.default = Input;
module.exports = exports['default'];
//# sourceMappingURL=Input.js.map