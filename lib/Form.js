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
var events = require('nocms-events');

var SUBMITTING_DEFAULT = '...';
var SUBMIT_BUTTON_DEFAULT = 'OK';

var convertDate = function convertDate(date) {
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date;
  }
  var dateMatch = date.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if (dateMatch) {
    return dateMatch[3] + '-' + dateMatch[2] + '-' + dateMatch[1];
  }
  return date;
};

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
    if (utils.isBrowser()) {
      stores.createStore(props.store, props.initialState, _this.handleStoreChange);
    }
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (utils.isBrowser()) {
        if (this.props.wizardStep) {
          stores.unsubscribe(this.props.store, this.handleStoreChange);
          return;
        }
        stores.remove(this.props.store, this.handleStoreChange);
      }
    }
  }, {
    key: 'setFormEl',
    value: function setFormEl(formEl) {
      this.formEl = formEl;
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
        var skipFields = ['isValid', 'isValidated', 'value', 'convertDate', 'isSubmitting', 'isDisabled'];
        if (prop === null || skipFields.indexOf(field) >= 0) {
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
          formData[field] = prop.convertDate ? convertDate(prop.value) : prop.value;
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
      var _this3 = this;

      setTimeout(function () {
        var target = _this3.formEl.querySelector('.form__error');
        if (target) {
          var targetPos = target.offsetTop;
          var input = target.querySelector('input');
          if (!input) {
            return;
          }
          utils.scrollTo(document.body, targetPos - 160, 400, function () {
            input.focus();
          });
        }
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          submitButton = _props.submitButton,
          submitButtonClassName = _props.submitButtonClassName,
          spinner = _props.spinner,
          submittingText = _props.submittingText,
          className = _props.className,
          centerSubmitButton = _props.centerSubmitButton,
          noSubmitButton = _props.noSubmitButton;

      var submitInProgress = void 0;
      if (spinner) {
        submitInProgress = spinner;
      } else if (submittingText) {
        submitInProgress = submittingText;
      } else {
        submitInProgress = SUBMITTING_DEFAULT;
      }
      var submit = null;
      var buttonContainerClassName = centerSubmitButton ? 'form__button-container form__button-container--center' : 'form__button-container';
      if (!noSubmitButton) {
        var buttonText = this.state.isSubmitting ? submitInProgress : submitButton || SUBMIT_BUTTON_DEFAULT;
        submit = React.createElement(
          'div',
          { className: buttonContainerClassName },
          React.createElement(
            'button',
            { disabled: this.state.isDisabled, type: 'submit', className: submitButtonClassName || 'button button__primary' },
            buttonText
          )
        );
      }
      var formClassName = (className + ' form').trim();
      return React.createElement(
        'form',
        {
          ref: function ref(node) {
            return _this4.setFormEl(node);
          },
          onSubmit: this.handleSubmit,
          className: formClassName,
          noValidate: true
        },
        this.state.errorText ? React.createElement(
          'div',
          { className: 'form__error form__error-summary visible' },
          this.state.errorText
        ) : null,
        this.props.children,
        utils.isBrowser() ? submit : spinner
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
  submitButtonClassName: React.PropTypes.string,
  noSubmitButton: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  centerSubmitButton: React.PropTypes.bool,
  spinner: React.PropTypes.object,
  submittingText: React.PropTypes.string,
  wizardStep: React.PropTypes.bool
};

Form.defaultProps = {
  centerSubmitButton: true
};

exports.default = Form;
module.exports = exports['default'];
//# sourceMappingURL=Form.js.map