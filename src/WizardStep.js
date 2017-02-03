import React, { Component, PropTypes } from 'react';
import Form from './Form';
import WizardControlButtons from './WizardControlButtons';

export default class WizardStep extends Component {
  constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  handleSubmit(formData, cb) {
    cb();
    if (this.props.isLast) {
      this.props.handleFinish(formData);
      return;
    }
    this.props.goNext(formData);
  }

  handleGoBack(e) {
    e.preventDefault();
    this.props.goBack();
  }

  render() {
    const {
      className,
      nextButtonText,
      backButtonText,
      finishButtonText,
      initialState,
      isFirst,
      isLast,
      store,
      errorText,
      backButtonClassName,
      nextButtonClassName,
      helpArea,
      stepHeader,
      stepFooter,
      finishButtonClassName,
    } = this.props;

    return (
      <div>
        { stepHeader }
        <Form
          wizardStep
          key={store}
          onSubmit={this.handleSubmit}
          initialState={initialState}
          className={className}
          store={store}
          errorText={errorText}
          noSubmitButton
        >
          {this.props.children}
          <WizardControlButtons
            showFinishButton={isLast}
            nextButtonText={nextButtonText}
            finishButtonText={finishButtonText}
            backButtonText={backButtonText}
            showBackButton={!isFirst}
            showNextButton={!isLast}
            handleGoBack={this.handleGoBack}
            backButtonClassName={backButtonClassName}
            nextButtonClassName={nextButtonClassName}
            finishButtonClassName={finishButtonClassName}
          />
        </Form>
        { stepFooter }
        { helpArea }
      </div>
    );
  }
}

WizardStep.propTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  handleFinish: PropTypes.func,
  className: PropTypes.string,
  nextButtonText: PropTypes.string.isRequired,
  backButtonText: PropTypes.string.isRequired,
  finishButtonText: PropTypes.string.isRequired,
  backButtonClassName: PropTypes.string,
  nextButtonClassName: PropTypes.string,
  finishButtonClassName: PropTypes.string,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  store: PropTypes.string,
  initialState: PropTypes.object,
  errorText: PropTypes.string,
  children: PropTypes.node,
  helpArea: PropTypes.object,
  stepHeader: PropTypes.object,
  stepFooter: PropTypes.object,
};

WizardStep.defaultProps = {
  nextButtonText: 'Neste',
  backButtonText: 'Tilbake',
  className: 'wizard__step',
};

WizardStep.childContextTypes = {
  store: React.PropTypes.string,
};
