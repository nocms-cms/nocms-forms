'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var stores = require('nocms-stores');
var Validator = require('nocms-validation');

var RadioButtons = function (_React$Component) {
  _inherits(RadioButtons, _React$Component);

  function RadioButtons(props) {
    _classCallCheck(this, RadioButtons);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadioButtons).call(this, props));

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
      if (global.environment !== 'server') {
        stores.subscribe(this.props.store, this.handleStoreChange);
        var store = stores.getStore(this.props.store);
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
        stores.update(this.props.store, inputState);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (global.environment !== 'server') {
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
      var _this2 = this;

      var containerClasses = 'pure-control-group' + (!this.state.isValid ? ' error' : '');
      var radios = this.props.options.map(function (o, index) {
        var option = o;
        if (typeof option === 'string') {
          option = { label: option, value: option };
        }
        return React.createElement(
          'label',
          { key: _this2.props.name + '_' + index, className: 'pure-radio' + (option.disabled ? ' disabled' : '') },
          React.createElement('input', {
            checked: _this2.state.value === option.value,
            type: 'radio',
            value: option.value,
            name: _this2.props.name,
            disabled: option.disabled,
            onChange: _this2.handleChange,
            onClick: _this2.handleChange,
            onKeyDown: _this2.handleEnterKey
          }),
          option.label
        );
      });
      return React.createElement(
        'div',
        { className: containerClasses },
        React.createElement(
          'fieldset',
          null,
          React.createElement(
            'legend',
            null,
            this.props.label
          ),
          radios,
          this.props.errorText && !this.state.isValid ? React.createElement(
            'div',
            { className: 'error-text' },
            this.props.errorText
          ) : null
        )
      );
    }
  }]);

  return RadioButtons;
}(React.Component);

exports.default = RadioButtons;


RadioButtons.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  errorText: React.PropTypes.string,
  store: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  validate: React.PropTypes.string,
  options: React.PropTypes.array,
  label: React.PropTypes.string
};

RadioButtons.defaultProps = {
  required: false
};
module.exports = exports['default'];
//# sourceMappingURL=RadioButtons.js.map