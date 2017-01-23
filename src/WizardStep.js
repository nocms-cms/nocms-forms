import React, { Component, PropTypes } from 'react';
import Form from './Form';

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
      nextButtonClassName,
      backButtonClassName,
      nextButtonText,
      backButtonText,
      store,
      stepState,
      errorText,
      spinner,
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
        {this.props.children}
        { global.environment !== 'server' ?
          <div className="button-container">
            {this.props.showBackButton ? <button onClick={this.handleGoBack} className={backButtonClassName}>{backButtonText}</button> : null}
            {this.props.showNextButton ? <button type="submit" className={nextButtonClassName}>{nextButtonText}</button> : null}
          </div>
        : spinner }
      </Form>
    );
  }
}

WizardStep.propTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  className: PropTypes.string,
  nextButtonClassName: PropTypes.string,
  backButtonClassName: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonText: PropTypes.string,
  store: PropTypes.string,
  stepState: PropTypes.object,
  errorText: PropTypes.string,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  children: React.PropTypes.node,
  spinner: React.PropTypes.object,
};

WizardStep.defaultProps = {
  nextButtonText: 'Neste',
  backButtonText: 'Tilbake',
  className: 'wizard__step',
  backButtonClassName: 'button button__back',
  nextButtonClassName: 'button button__next',
};
