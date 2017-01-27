import React, { Component, PropTypes } from 'react';
import Form from './Form';
import DefaultWizardFooter from './WizardFooter';

export default class WizardStep extends Component {
  constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.goNext();
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
      showBackButton,
      showNextButton,
      store,
      stepState,
      errorText,
      wizardFooter,
      wizardHeader,
    } = this.props;
    return (
      <Form
        wizardStep
        key={store}
        onSubmit={this.handleSubmit}
        initialState={stepState}
        className={className}
        store={store}
        errorText={errorText}
        noSubmitButton
      >
        {wizardHeader ? wizardHeader : null }
        {this.props.children}
        {wizardFooter ? wizardFooter :
        <DefaultWizardFooter
          nextButtonText={nextButtonText}
          backButtonText={backButtonText}
          showNextButton={showNextButton}
          showBackButton={showBackButton}
          handleGoBack={this.handleGoBack}
        /> }
      </Form>
    );
  }
}

WizardStep.propTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  className: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonText: PropTypes.string,
  store: PropTypes.string,
  stepState: PropTypes.object,
  errorText: PropTypes.string,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  children: React.PropTypes.node,
  wizardHeader: React.PropTypes.object,
  wizardFooter: React.PropTypes.object,
};

WizardStep.defaultProps = {
  nextButtonText: 'Neste',
  backButtonText: 'Tilbake',
  className: 'wizard__step',
  backButtonClassName: 'button button__back',
  nextButtonClassName: 'button button__next',
};
