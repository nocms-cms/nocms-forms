'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerClassName = 'form__button-container';

var WizardControlButtons = function WizardControlButtons(props) {
  var showBackButton = props.showBackButton,
      showNextButton = props.showNextButton,
      showFinishButton = props.showFinishButton,
      backButtonText = props.backButtonText,
      nextButtonText = props.nextButtonText,
      finishButtonText = props.finishButtonText,
      finishButtonClassName = props.finishButtonClassName,
      backButtonClassName = props.backButtonClassName,
      nextButtonClassName = props.nextButtonClassName,
      handleGoBack = props.handleGoBack;

  return _react2.default.createElement(
    'div',
    { className: containerClassName },
    showBackButton ? _react2.default.createElement(
      'button',
      { onClick: handleGoBack, className: backButtonClassName },
      backButtonText
    ) : null,
    showNextButton ? _react2.default.createElement(
      'button',
      { type: 'submit', className: nextButtonClassName },
      nextButtonText
    ) : null,
    showFinishButton ? _react2.default.createElement(
      'button',
      { type: 'submit', className: finishButtonClassName },
      finishButtonText
    ) : null
  );
};

WizardControlButtons.propTypes = {
  showBackButton: _react.PropTypes.bool,
  showNextButton: _react.PropTypes.bool,
  showFinishButton: _react.PropTypes.bool,
  backButtonText: _react.PropTypes.string,
  nextButtonText: _react.PropTypes.string,
  backButtonClassName: _react.PropTypes.string,
  nextButtonClassName: _react.PropTypes.string,
  handleGoBack: _react.PropTypes.func.isRequired,
  finishButtonText: _react.PropTypes.string.isRequired,
  finishButtonClassName: _react.PropTypes.string
};

WizardControlButtons.defaultProps = {
  backButtonClassName: 'button button__back',
  nextButtonClassName: 'button button__next',
  finishButtonClassName: 'button button__finish'
};

exports.default = WizardControlButtons;
module.exports = exports['default'];
//# sourceMappingURL=WizardControlButtons.js.map