'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _WizardFooter = require('./WizardFooter');

var _WizardFooter2 = _interopRequireDefault(_WizardFooter);

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
    key: 'handleSubmit',
    value: function handleSubmit() {
      this.props.goNext();
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
          stepState = _props.stepState,
          isFirst = _props.isFirst,
          isLast = _props.isLast,
          store = _props.store,
          errorText = _props.errorText,
          wizardFooter = _props.wizardFooter,
          wizardHeader = _props.wizardHeader;

      return _react2.default.createElement(
        _Form2.default,
        {
          wizardStep: true,
          key: store,
          onSubmit: this.handleSubmit,
          initialState: stepState,
          className: className,
          store: store,
          errorText: errorText,
          noSubmitButton: true
        },
        wizardHeader,
        this.props.children,
        wizardFooter ? wizardFooter : _react2.default.createElement(_WizardFooter2.default, {
          nextButtonText: nextButtonText,
          backButtonText: backButtonText,
          showBackButton: !isFirst,
          showNextButton: !isLast,
          handleGoBack: this.handleGoBack
        })
      );
    }
  }]);

  return WizardStep;
}(_react.Component);

exports.default = WizardStep;


WizardStep.propTypes = {
  goBack: _react.PropTypes.func,
  goNext: _react.PropTypes.func,
  className: _react.PropTypes.string,
  nextButtonText: _react.PropTypes.string,
  backButtonText: _react.PropTypes.string,
  isFirst: _react.PropTypes.bool,
  isLast: _react.PropTypes.bool,
  store: _react.PropTypes.string,
  stepState: _react.PropTypes.object,
  errorText: _react.PropTypes.string,
  children: _react.PropTypes.node,
  wizardHeader: _react.PropTypes.object,
  wizardFooter: _react.PropTypes.object
};

WizardStep.defaultProps = {
  nextButtonText: 'Neste',
  backButtonText: 'Tilbake',
  className: 'wizard__step',
  backButtonClassName: 'button button__back',
  nextButtonClassName: 'button button__next'
};
module.exports = exports['default'];
//# sourceMappingURL=WizardStep.js.map