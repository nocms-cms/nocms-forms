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

var _nocmsStores = require('nocms-stores');

var _nocmsStores2 = _interopRequireDefault(_nocmsStores);

var _nocmsUtils = require('nocms-utils');

var _nocmsUtils2 = _interopRequireDefault(_nocmsUtils);

var _nocmsEvents = require('nocms-events');

var _nocmsEvents2 = _interopRequireDefault(_nocmsEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Form = function (_Component) {
  _inherits(Form, _Component);

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
    if (_nocmsUtils2.default.isBrowser()) {
      _nocmsStores2.default.createStore(props.store, props.initialState, _this.handleStoreChange);
    }
    return _this;
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        store: this.props.store
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (_nocmsUtils2.default.isBrowser()) {
        if (this.props.wizardStep) {
          _nocmsStores2.default.unsubscribe(this.props.store, this.handleStoreChange);
          return;
        }
        _nocmsStores2.default.remove(this.props.store, this.handleStoreChange);
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
      var formIsValid = true;

      if (this.state.store) {
        Object.keys(this.state.store).forEach(function (field) {
          var prop = _this2.state.store[field];
          if (prop === null || typeof prop === 'undefined') {
            return;
          }
          if (prop.disabled) {
            return;
          }
          if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object' || prop instanceof Array) {
            formData[field] = prop;
            return;
          }
          var thisOneIsValid = false;
          if (!prop.isValidated) {
            thisOneIsValid = prop.validate();
          }
          if (prop.isValidated) {
            thisOneIsValid = prop.isValid;
          }
          if (formIsValid) {
            formData[field] = prop.convertDate ? convertDate(prop.value) : prop.value;
          }

          formIsValid = formIsValid && thisOneIsValid;
        });
      }

      this.setState({ isValid: formIsValid });

      if (!formIsValid) {
        this.scrollToError();
        return;
      }
      this.setState({ isSubmitting: true, isDisabled: true });
      _nocmsEvents2.default.trigger('form_sent', this.props.store);

      if (this.props.onSubmit) {
        this.props.onSubmit(formData, this.handleFinishSubmit.bind(this));
      }
    }
  }, {
    key: 'scrollToError',
    value: function scrollToError() {
      var _this3 = this;

      setTimeout(function () {
        var target = _this3.formEl.querySelector('.error-node');
        if (target) {
          var targetPos = target.offsetTop;
          var input = target.querySelector('select, textarea, radio, input');
          if (!input) {
            return;
          }
          _nocmsUtils2.default.scrollTo(document.body, targetPos - 160, _this3.props.scrollDuration, function () {
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
          submitButtonText = _props.submitButtonText,
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
      var buttons = null;
      var buttonContainerClassName = centerSubmitButton ? 'form__button-container form__button-container--center' : 'form__button-container';
      if (!noSubmitButton) {
        var buttonText = this.state.isSubmitting ? submitInProgress : submitButtonText || SUBMIT_BUTTON_DEFAULT;
        buttons = _react2.default.createElement(
          'div',
          { className: buttonContainerClassName },
          this.props.backButton,
          _react2.default.createElement(
            'button',
            { disabled: this.state.isDisabled, type: 'submit', className: submitButtonClassName || 'button button__primary' },
            buttonText
          )
        );
      }
      return _react2.default.createElement(
        'form',
        {
          ref: function ref(node) {
            return _this4.setFormEl(node);
          },
          onSubmit: this.handleSubmit,
          className: className,
          noValidate: true
        },
        this.state.errorText ? _react2.default.createElement(
          'div',
          { className: 'form__error form__error-summary visible' },
          this.state.errorText
        ) : null,
        this.props.children,
        _nocmsUtils2.default.isBrowser() ? buttons : spinner
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  initialState: _propTypes2.default.object,
  store: _propTypes2.default.string.isRequired,
  onSubmit: _propTypes2.default.func,
  submitButtonText: _propTypes2.default.string,
  submitButtonClassName: _propTypes2.default.string,
  noSubmitButton: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  centerSubmitButton: _propTypes2.default.bool,
  spinner: _propTypes2.default.object,
  backButton: _propTypes2.default.object,
  submittingText: _propTypes2.default.string,
  wizardStep: _propTypes2.default.bool,
  scrollDuration: _propTypes2.default.number
};

Form.defaultProps = {
  centerSubmitButton: true,
  className: 'form',
  scrollDuration: 400
};

Form.childContextTypes = {
  store: _propTypes2.default.string
};

exports.default = Form;
module.exports = exports['default'];
//# sourceMappingURL=Form.js.map