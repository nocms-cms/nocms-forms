import React, { PropTypes } from 'react';

const containerClassName = 'form__button-container';
// @TODO: Prevent submitting before scripts are loaded, aka global.environment !==server
const WizardControlButtons = (props) => {
  const {
    showBackButton,
    showNextButton,
    backButtonText,
    nextButtonText,
    backButtonClassName,
    nextButtonClassName,
    handleGoBack,
  } = props;
  return (
    <div className={containerClassName}>
      {showBackButton ?
        <button onClick={handleGoBack} className={backButtonClassName}>
          {backButtonText}
        </button> : null}
      {showNextButton ?
        <button type="submit" className={nextButtonClassName}>
          {nextButtonText}
        </button> : null}
    </div>
  );
};

WizardControlButtons.propTypes = {
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  backButtonText: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonClassName: PropTypes.string,
  nextButtonClassName: PropTypes.string,
  handleGoBack: PropTypes.func.isRequired,
};

WizardControlButtons.defaultProps = {
  backButtonClassName: 'button button__back',
  nextButtonClassName: 'button button__next',
};

module.exports = WizardControlButtons;
