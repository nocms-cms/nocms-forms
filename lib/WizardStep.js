'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _WizardControlButtons = require('./WizardControlButtons');

var _WizardControlButtons2 = _interopRequireDefault(_WizardControlButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WizardStep = function (_Component) {
  _inherits(WizardStep, _Component);

  function WizardStep(props) {
    _classCallCheck(this, WizardStep);

    var _this = _possibleConstructorReturn(this, (WizardStep.__proto__ || Object.getPrototypeOf(WizardStep)).call(this, props));

    _this.handleGoBack = _this.handleGoBack.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(WizardStep, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        store: this.props.store
      };
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(formData, cb) {
      cb();
      if (this.props.isLast) {
        this.props.handleFinish(formData);
        return;
      }
      this.props.goNext(formData);
    }
  }, {
    key: 'handleGoBack',
    value: function handleGoBack(e) {
      e.preventDefault();
      this.props.goBack();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          nextButtonText = _props.nextButtonText,
          backButtonText = _props.backButtonText,
          finishButtonText = _props.finishButtonText,
          initialState = _props.initialState,
          isFirst = _props.isFirst,
          isLast = _props.isLast,
          store = _props.store,
          errorText = _props.errorText,
          backButtonClassName = _props.backButtonClassName,
          nextButtonClassName = _props.nextButtonClassName,
          helpArea = _props.helpArea,
          stepHeader = _props.stepHeader,
          stepFooter = _props.stepFooter,
          finishButtonClassName = _props.finishButtonClassName,
          formClass = _props.formClass;


      return _react2.default.createElement(
        'div',
        { className: className },
        stepHeader,
        _react2.default.createElement(
          _Form2.default,
          {
            wizardStep: true,
            key: store,
            onSubmit: this.handleSubmit,
            initialState: initialState,
            className: formClass,
            store: store,
            errorText: errorText,
            noSubmitButton: true
          },
          this.props.children,
          _react2.default.createElement(_WizardControlButtons2.default, {
            showFinishButton: isLast,
            nextButtonText: nextButtonText,
            finishButtonText: finishButtonText,
            backButtonText: backButtonText,
            showBackButton: !isFirst,
            showNextButton: !isLast,
            handleGoBack: this.handleGoBack,
            backButtonClassName: backButtonClassName,
            nextButtonClassName: nextButtonClassName,
            finishButtonClassName: finishButtonClassName
          })
        ),
        stepFooter,
        helpArea
      );
    }
  }]);

  return WizardStep;
}(_react.Component);

exports.default = WizardStep;


WizardStep.propTypes = {
  goBack: _react.PropTypes.func,
  goNext: _react.PropTypes.func,
  handleFinish: _react.PropTypes.func,
  className: _react.PropTypes.string,
  formClass: _react.PropTypes.string,
  nextButtonText: _react.PropTypes.string.isRequired,
  backButtonText: _react.PropTypes.string.isRequired,
  finishButtonText: _react.PropTypes.string.isRequired,
  backButtonClassName: _react.PropTypes.string,
  nextButtonClassName: _react.PropTypes.string,
  finishButtonClassName: _react.PropTypes.string,
  isFirst: _react.PropTypes.bool,
  isLast: _react.PropTypes.bool,
  store: _react.PropTypes.string,
  initialState: _react.PropTypes.object,
  errorText: _react.PropTypes.string,
  children: _react.PropTypes.node,
  helpArea: _react.PropTypes.object,
  stepHeader: _react.PropTypes.object,
  stepFooter: _react.PropTypes.object
};

WizardStep.defaultProps = {
  nextButtonText: 'Neste',
  backButtonText: 'Tilbake',
  className: 'wizard__step'
};

WizardStep.childContextTypes = {
  store: _react2.default.PropTypes.string
};
module.exports = exports['default'];
//# sourceMappingURL=WizardStep.js.map