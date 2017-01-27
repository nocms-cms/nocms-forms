import React, { PropTypes } from 'react';

const backButtonClassName = 'button__back';
const nextButtonClassName = 'button__next';
const containerClassName = 'button-container';
// @TODO: Prevent submitting before scripts are loaded, aka global.environment !==server
const WizardFooter = (props) => {
  const {
    showBackButton,
    showNextButton,
    backButtonText,
    nextButtonText,
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

WizardFooter.propTypes = {
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  backButtonText: PropTypes.string,
  nextButtonText: PropTypes.string,
  handleGoBack: PropTypes.func.isRequired,
};

module.exports = WizardFooter;
