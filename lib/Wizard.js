'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nocmsStores = require('nocms-stores');

var _nocmsStores2 = _interopRequireDefault(_nocmsStores);

var _WizardStep = require('./WizardStep');

var _WizardStep2 = _interopRequireDefault(_WizardStep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wizard = function (_Component) {
  _inherits(Wizard, _Component);

  function Wizard(props) {
    _classCallCheck(this, Wizard);

    var _this = _possibleConstructorReturn(this, (Wizard.__proto__ || Object.getPrototypeOf(Wizard)).call(this, props));

    _this.goBack = _this.goBack.bind(_this);
    _this.goNext = _this.goNext.bind(_this);
    _this.state = {
      currentStep: 0,
      lastStepIndex: props.steps.length - 1,
      wizardData: {},
      initialStates: props.steps.map(function (step) {
        return step.initialState || {};
      })
    };
    return _this;
  }

  _createClass(Wizard, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      if (global.environment !== 'server') {
        this.props.steps.forEach(function (step, index) {
          _nocmsStores2.default.remove(_this2.getStoreForStep(index));
        });
      }
    }
  }, {
    key: 'getStoreForStep',
    value: function getStoreForStep(index) {
      return this.props.store + '-step-' + index;
    }
  }, {
    key: 'getStep',
    value: function getStep() {
      var current = this.state.currentStep;
      return {
        index: current,
        component: this.props.steps[current],
        store: this.getStoreForStep(current),
        isFirst: current === 0,
        isLast: current === this.props.steps.length - 1,
        initialState: this.state.initialStates[current]
      };
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      if (this.props.goBack) {
        this.setState({ currentStep: this.props.goBack(this.state.wizardData, this.state.currentStep) });
        return;
      }
      this.setState({ currentStep: Math.max(0, this.state.currentStep - 1) });
    }
  }, {
    key: 'goNext',
    value: function goNext(formData) {
      var wizardData = Object.assign(this.state.wizardData, formData);
      this.setState({ wizardData: wizardData });

      if (this.props.goNext) {
        this.setState({ currentStep: this.props.goNext(wizardData, this.state.currentStep) });
        return;
      }
      this.setState({ currentStep: Math.min(this.state.lastStepIndex, this.state.currentStep + 1) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          wizardStepClassName = _props.wizardStepClassName,
          errorText = _props.errorText,
          nextButtonText = _props.nextButtonText,
          backButtonText = _props.backButtonText,
          backButtonClassName = _props.backButtonClassName,
          nextButtonClassName = _props.nextButtonClassName,
          spinner = _props.spinner,
          steps = _props.steps,
          wizardHeader = _props.wizardHeader,
          wizardFooter = _props.wizardFooter;

      var step = this.getStep();
      var wizardHeaderWithCurrentStep = void 0;
      var wizardFooterWithCurrentStep = void 0;
      if (wizardHeader) {
        wizardHeaderWithCurrentStep = this.addCurrentStep(wizardHeader);
      }
      if (wizardFooter) {
        wizardFooterWithCurrentStep = this.addCurrentStep(wizardFooter);
      }
      return _react2.default.createElement(
        'div',
        { className: className },
        this.props.progressIndicator && this.props.progressIndicator(step.index, this.state.lastStepIndex),
        this.state.showReceipt ? this.props.receiptStep : _react2.default.createElement(
          _WizardStep2.default,
          _extends({
            goNext: this.goNext,
            goBack: this.goBack,
            className: wizardStepClassName
          }, step, {
            nextButtonText: nextButtonText,
            backButtonText: backButtonText,
            nextButtonClassName: nextButtonClassName,
            backButtonClassName: backButtonClassName,
            errorText: errorText,
            spinner: spinner,
            noOfSteps: steps.length,
            wizardHeader: wizardHeader ? wizardHeaderWithCurrentStep : null,
            wizardFooter: wizardFooter ? wizardFooterWithCurrentStep : null
          }),
          this.props.steps[this.state.currentStep].component
        )
      );
    }
  }]);

  return Wizard;
}(_react.Component);

exports.default = Wizard;


Wizard.propTypes = {
  steps: _react.PropTypes.array,
  store: _react.PropTypes.string,
  goBack: _react.PropTypes.func,
  goNext: _react.PropTypes.func,
  progressIndicator: _react.PropTypes.func,
  nextButtonClassName: _react.PropTypes.string,
  backButtonClassName: _react.PropTypes.string,
  nextButtonText: _react.PropTypes.string,
  backButtonText: _react.PropTypes.string,
  errorText: _react.PropTypes.string,
  className: _react.PropTypes.string,
  wizardStepClassName: _react.PropTypes.string,
  spinner: _react.PropTypes.object,
  wizardHeader: _react.PropTypes.object,
  wizardFooter: _react.PropTypes.object,
  receiptStep: _react.PropTypes.object
};

Wizard.defaultProps = {
  className: 'wizard'
};
module.exports = exports['default'];
//# sourceMappingURL=Wizard.js.map