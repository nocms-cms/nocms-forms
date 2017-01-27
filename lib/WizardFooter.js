'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backButtonClassName = 'button__back';
var nextButtonClassName = 'button__next';
var containerClassName = 'button-container';
// @TODO: Prevent submitting before scripts are loaded, aka global.environment !==server
var WizardFooter = function WizardFooter(props) {
  var showBackButton = props.showBackButton,
      showNextButton = props.showNextButton,
      backButtonText = props.backButtonText,
      nextButtonText = props.nextButtonText,
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
    ) : null
  );
};

WizardFooter.propTypes = {
  showBackButton: _react.PropTypes.bool,
  showNextButton: _react.PropTypes.bool,
  backButtonText: _react.PropTypes.string,
  nextButtonText: _react.PropTypes.string,
  handleGoBack: _react.PropTypes.func.isRequired
};

module.exports = WizardFooter;
//# sourceMappingURL=WizardFooter.js.map