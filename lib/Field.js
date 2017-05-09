'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nocmsValidation = require('nocms-validation');

var _nocmsValidation2 = _interopRequireDefault(_nocmsValidation);

var _nocmsUtils = require('nocms-utils');

var _nocmsUtils2 = _interopRequireDefault(_nocmsUtils);

var _nocmsStores = require('nocms-stores');

var _nocmsStores2 = _interopRequireDefault(_nocmsStores);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Hidden = require('./Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

var _RadioButtons = require('./RadioButtons');

var _RadioButtons2 = _interopRequireDefault(_RadioButtons);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _MultipleCheckbox = require('./MultipleCheckbox');

var _MultipleCheckbox2 = _interopRequireDefault(_MultipleCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_Component) {
  _inherits(Field, _Component);

  function Field(props) {
    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.validate = _this.validate.bind(_this);
    _this.handleEnterKey = _this.handleEnterKey.bind(_this);
    _this.applyExistingStoreValue = _this.applyExistingStoreValue.bind(_this);
    _this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
      convertDate: props.type === 'date',
      disabled: props.disabled
    };
    return _this;
  }

  _createClass(Field, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_nocmsUtils2.default.isBrowser()) {
        _nocmsStores2.default.subscribe(this.context.store, this.handleStoreChange);
        this.applyExistingStoreValue();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (props.disabled !== this.state.disabled) {
        this.setState({ disabled: props.disabled, isValid: true, isValidated: false }, function () {
          _this2.updateStore(_this2.state.value, true, false);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_nocmsUtils2.default.isBrowser()) {
        _nocmsStores2.default.unsubscribe(this.context.store, this.handleStoreChange);
        if (this.props.deleteOnUnmount) {
          var inputState = {};
          inputState[this.props.name] = undefined;
          _nocmsStores2.default.update(this.context.store, inputState);
        }
      }
    }
  }, {
    key: 'applyExistingStoreValue',
    value: function applyExistingStoreValue() {
      var store = _nocmsStores2.default.getStore(this.context.store);
      var initialState = store[this.props.name];
      var inputState = {};
      inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate, disabled: this.state.disabled };

      if (typeof initialState === 'undefined' || initialState === null) {
        if (this.props.type === 'text' || this.props.type === 'textarea' || this.props.type === 'hidden') {
          inputState[this.props.name].value = this.props.value || '';
        }
      } else if ((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) !== 'object') {
        inputState[this.props.name].value = initialState;
      } else {
        inputState[this.props.name] = initialState;
      }

      _nocmsStores2.default.update(this.context.store, inputState);
    }
  }, {
    key: 'handleDependentState',
    value: function handleDependentState(store, changes) {
      if (!this.props.dependOn) {
        return false;
      }

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
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(store, changes) {
      if (this.props.dependOn && this.handleDependentState(store, changes)) {
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
      var value = void 0;
      if (this.props.type === 'checkbox') {
        if (this.props.multiple) {
          var oldValue = this.state.value || [];
          if (e.target.checked) {
            value = [].concat(_toConsumableArray(oldValue), [e.target.value]);
          } else {
            value = oldValue.filter(function (v) {
              return v !== e.target.value;
            });
          }
        } else {
          value = e.currentTarget.checked;
        }
      } else if (this.props.type === 'select' && this.props.multiple) {
        value = [].concat(_toConsumableArray(e.target.options)).filter(function (o) {
          return o.selected;
        }).map(function (o) {
          return o.value;
        });
      } else {
        value = e.currentTarget.value;
      }
      this.updateStore(value, true, this.state.isValidated);
      if (this.props.onChange) {
        this.props.onChange(e, e.currentTarget.value);
      }
    }
  }, {
    key: 'handleEnterKey',
    value: function handleEnterKey(e) {
      if (e.keyCode === 13) {
        // Enter
        e.preventDefault();
        this.validate();
      }
    }
  }, {
    key: 'updateStore',
    value: function updateStore(value, isValid, isValidated) {
      var state = {};
      state[this.props.name] = {
        value: value,
        isValid: isValid,
        isValidated: isValidated,
        disabled: this.state.disabled,
        validate: this.validate,
        convertDate: this.props.type === 'date'
      };

      _nocmsStores2.default.update(this.context.store, state);
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (this.props.disabled) {
        return true;
      }
      if (!this.props.validate && !this.props.required) {
        return true;
      }
      var value = this.state.value;
      if (this.props.type === 'date' && this.props.dateParser) {
        value = this.props.dateParser(value);
      }
      var isValid = _nocmsValidation2.default.validate(value, this.props.validate, this.props.required);
      this.updateStore(this.state.value, isValid, true);
      return isValid;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          options = _props.options,
          multiple = _props.multiple;

      var props = Object.assign({}, this.props, this.state);

      props.handleChange = this.handleChange;
      props.handleKeyDown = this.handleEnterKey;
      props.validate = this.validate;
      props.key = this.props.name;
      if (type === 'hidden') {
        return _react2.default.createElement(_Hidden2.default, props);
      }
      if (type === 'radio') {
        return _react2.default.createElement(_RadioButtons2.default, props);
      }
      if (type === 'textarea') {
        return _react2.default.createElement(_TextArea2.default, props);
      }
      if (type === 'select') {
        return _react2.default.createElement(_Select2.default, props);
      }
      if (type === 'checkbox') {
        return options && multiple ? _react2.default.createElement(_MultipleCheckbox2.default, props) : _react2.default.createElement(_Checkbox2.default, props);
      }
      return _react2.default.createElement(_Input2.default, props);
    }
  }]);

  return Field;
}(_react.Component);

Field.propTypes = {
  name: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  disabled: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  deleteOnUnmount: _propTypes2.default.bool,
  validate: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  dependOn: _propTypes2.default.string,
  dependencyFunc: _propTypes2.default.func,
  dateParser: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  multiple: _propTypes2.default.bool,
  options: _propTypes2.default.array
};

Field.defaultProps = {
  type: 'text'
};

Field.contextTypes = {
  store: _propTypes2.default.string };

exports.default = Field;
module.exports = exports['default'];
//# sourceMappingURL=Field.js.map