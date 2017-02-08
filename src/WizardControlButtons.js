import React, { PropTypes } from 'react';

const containerClassName = 'form__button-container';

const WizardControlButtons = (props) => {
  const {
    showBackButton,
    showNextButton,
    showFinishButton,
    backButtonText,
    nextButtonText,
    finishButtonText,
    finishButtonClassName,
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
      {showFinishButton ?
        <button type="submit" className={finishButtonClassName}>
          {finishButtonText}
        </button> : null}
    </div>
  );
};

WizardControlButtons.propTypes = {
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showFinishButton: PropTypes.bool,
  backButtonText: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonClassName: PropTypes.string,
  nextButtonClassName: PropTypes.string,
  handleGoBack: PropTypes.func.isRequired,
  finishButtonText: PropTypes.string.isRequired,
  finishButtonClassName: PropTypes.string,
};

WizardControlButtons.defaultProps = {
  backButtonClassName: 'button button__back',
  nextButtonClassName: 'button button__next',
  finishButtonClassName: 'button button__finish',
};

export default WizardControlButtons;
