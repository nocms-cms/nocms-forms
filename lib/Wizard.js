'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nocmsStores = require('nocms-stores');

var _nocmsStores2 = _interopRequireDefault(_nocmsStores);

var _nocmsUtils = require('nocms-utils');

var _nocmsUtils2 = _interopRequireDefault(_nocmsUtils);

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
    _this.handleFinish = _this.handleFinish.bind(_this);
    _this.applyWizardProps = _this.applyWizardProps.bind(_this);
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

      if (_nocmsUtils2.default.isBrowser()) {
        this.props.steps.forEach(function (step, index) {
          _nocmsStores2.default.remove(_this2.getStoreForStep(index));
        });
      }
    }
  }, {
    key: 'getStoreForStep',
    value: function getStoreForStep() {
      return this.props.store + '-step-' + this.state.currentStep;
    }
  }, {
    key: 'getInitialStateForStep',
    value: function getInitialStateForStep() {
      return this.state.initialStates[this.state.currentStep];
    }
  }, {
    key: 'getStep',
    value: function getStep() {
      var current = this.state.currentStep;
      var step = this.props.steps[current];
      var stepComponent = this.props.steps[current].component;

      return {
        index: current,
        component: this.applyWizardProps(stepComponent),
        store: this.getStoreForStep(current),
        isFirst: current === 0,
        isLast: current === this.props.steps.length - 1,
        initialState: this.state.initialStates[current],
        stepHeader: step.stepHeader,
        stepFooter: step.stepFooter,
        helpArea: step.helpArea,
        overrideSubmit: step.overrideSubmit
      };
    }
  }, {
    key: 'getBackButton',
    value: function getBackButton() {
      if (this.state.currentStep === 0) {
        return null;
      }
      return _react2.default.createElement(
        'button',
        { onClick: this.goBack, className: this.props.backButtonClassName },
        this.props.backButtonText
      );
    }
  }, {
    key: 'applyWizardProps',
    value: function applyWizardProps(component) {
      var props = {
        store: this.getStoreForStep(),
        goNext: this.goNext,
        handleFinish: this.handleFinish,
        wizardData: this.state.wizardData,
        backButton: this.getBackButton(),
        initialState: this.getInitialStateForStep()
      };
      return _react2.default.cloneElement(component, props);
    }
  }, {
    key: 'goBack',
    value: function goBack(e) {
      if (e) {
        e.preventDefault();
      }
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
      if (this.state.currentStep === this.state.lastStepIndex) {
        this.handleFinish(formData);
        this.setState({ showReceipt: true });
        return;
      }
      this.setState({ currentStep: Math.min(this.state.lastStepIndex, this.state.currentStep + 1) });
    }
  }, {
    key: 'handleFinish',
    value: function handleFinish(formData, cb) {
      var _this3 = this;

      var wizardData = Object.assign(this.state.wizardData, formData);
      this.props.handleFinish(wizardData, function (err) {
        cb();
        if (!err) {
          _this3.setState({ showReceipt: true });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var step = this.getStep();
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        this.state.showReceipt ? this.props.receipt(this.state.wizardData) : _react2.default.createElement(
          'div',
          null,
          this.props.progressIndicator && this.props.progressIndicator(step.index + 1, this.state.lastStepIndex + 1),
          step.component
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
  handleFinish: _react.PropTypes.func.isRequired,
  backButtonClassName: _react.PropTypes.string,
  backButtonText: _react.PropTypes.string,
  className: _react.PropTypes.string,
  receipt: _react.PropTypes.func
};

Wizard.defaultProps = {
  className: 'wizard',
  backButtonText: 'Back',
  backButtonClassName: 'button button__back'
};
module.exports = exports['default'];
//# sourceMappingURL=Wizard.js.map