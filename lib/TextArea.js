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
var Validator = require('nocms-validation');

var TextArea = function (_React$Component) {
  _inherits(TextArea, _React$Component);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextArea).call(this, props));

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
      if (global.environment !== 'server') {
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
      var containerClasses = 'form__control-group' + (!this.state.isValid ? ' form__error' : '') + (this.props.customClasses ? ' ' + this.props.customClasses : '');
      var isRequiredLabelClass = this.props.required ? 'form__label-required' : '';
      return React.createElement(
        'div',
        { className: containerClasses },
        React.createElement(
          'label',
          { id: this.props.labelId },
          this.props.label,
          ' ',
          this.props.required ? React.createElement(
            'span',
            { className: isRequiredLabelClass },
            this.props.requiredMark
          ) : null,
          React.createElement('textarea', {
            name: this.props.name,
            'aria-invalid': !this.state.isValid,
            'aria-required': this.props.required,
            onChange: this.handleChange,
            onBlur: this.validate,
            maxLength: this.props.maxLength ? this.props.maxLength : '',
            value: this.state.value
          }),
          this.props.errorText && !this.state.isValid ? React.createElement(
            'div',
            { className: 'form__error-text' },
            this.props.errorText
          ) : null
        )
      );
    }
  }]);

  return TextArea;
}(React.Component);

exports.default = TextArea;


TextArea.propTypes = {
  validate: React.PropTypes.string,
  required: React.PropTypes.bool,
  store: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  errorText: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  customClasses: React.PropTypes.string,
  labelId: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  requiredMark: React.PropTypes.string
};

TextArea.defaultProps = {
  requiredMark: '*'
};
module.exports = exports['default'];
//# sourceMappingURL=TextArea.js.map