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
var ReactDOM = require('react-dom');
var stores = require('nocms-stores');
var utils = require('nocms-utils');
var events = require('nocms-events');
var Spinner = require('./Spinner');

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.state = props.initialState || {};
    _this.state.isValid = false;
    _this.state.isDisabled = false;
    _this.state.isSubmitting = false;
    _this.state.errorText = null;
    if (global.environment !== 'server') {
      stores.createStore(props.store, props.initialState, _this.handleStoreChange);
    }
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (global.environment !== 'server') {
        stores.remove(this.props.store, this.handleStoreChange);
      }
    }
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(store) {
      this.setState({ store: store });
    }
  }, {
    key: 'handleFinishSubmit',
    value: function handleFinishSubmit(errorText) {
      this.setState({ isSubmitting: false, isDisabled: false, errorText: errorText });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var formData = {};
      var isValid = true;

      Object.keys(this.state.store).forEach(function (field) {
        var prop = _this2.state.store[field];
        if (prop === null) {
          return;
        }
        if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object') {
          formData[field] = prop;
          return;
        }
        if (!prop.isValidated) {
          isValid = isValid && prop.validate();
        }
        if (prop.isValidated) {
          isValid = isValid && prop.isValid;
        }
        if (isValid) {
          formData[field] = prop.convertDate ? _this2.convertDate(prop.value) : prop.value;
        }
      });

      this.setState({ isValid: isValid });

      if (!isValid) {
        this.scrollToError();
        return;
      }
      this.setState({ isSubmitting: true, isDisabled: true });
      events.trigger('form_sent', this.props.store);

      if (this.props.onSubmit) {
        this.props.onSubmit(formData, this.handleFinishSubmit.bind(this));
      }
    }
  }, {
    key: 'scrollToError',
    value: function scrollToError() {
      var domNode = ReactDOM.findDOMNode(this);
      setTimeout(function () {
        var target = domNode.querySelector('.form__error');
        if (target) {
          var _ret = function () {
            var targetPos = target.offsetTop;
            var input = target.querySelector('input');
            if (!input) {
              return {
                v: void 0
              };
            }
            utils.scrollTo(document.body, targetPos - 160, 400, function () {
              input.focus();
            });
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      }, 0);
    }
  }, {
    key: 'convertDate',
    value: function convertDate(date) {
      if (/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return date;
      }
      var dateMatch = date.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
      if (dateMatch) {
        return dateMatch[3] + '-' + dateMatch[2] + '-' + dateMatch[1];
      }
      return date;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className ? this.props.className + ' form' : 'form';
      var buttonContainerClassName = this.props.centerSubmitButton ? 'form__button-container form__button-container--center' : 'form__button-container';
      var buttonText = this.state.isSubmitting ? React.createElement(Spinner, { visible: true, light: true }) : this.props.submitButton || 'OK';
      return React.createElement(
        'form',
        {
          onSubmit: this.handleSubmit,
          className: className,
          noValidate: true
        },
        this.state.errorText ? React.createElement(
          'div',
          { className: 'form__error form__error-summary visible' },
          this.state.errorText
        ) : null,
        this.props.children,
        global.environment !== 'server' ? React.createElement(
          'div',
          { className: buttonContainerClassName },
          React.createElement(
            'button',
            { disabled: this.state.isDisabled, type: 'submit', className: 'button button__primary' },
            buttonText
          )
        ) : React.createElement(Spinner, { visible: true })
      );
    }
  }]);

  return Form;
}(React.Component);

Form.propTypes = {
  initialState: React.PropTypes.object,
  store: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func,
  submitButton: React.PropTypes.string,
  errorText: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  centerSubmitButton: React.PropTypes.bool
};

Form.defaultProps = {
  centerSubmitButton: true
};

exports.default = Form;
module.exports = exports['default'];
//# sourceMappingURL=Form.js.map