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
      initialState,
      isFirst,
      isLast,
      store,
      errorText,
      wizardHeader,
      backButtonClassName,
      nextButtonClassName,
      helpArea,
    } = this.props;

    return (
      <div>
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
          {wizardHeader}
          {this.props.children}
          <WizardControlButtons
            nextButtonText={nextButtonText}
            backButtonText={backButtonText}
            showBackButton={!isFirst}
            showNextButton={!isLast}
            handleGoBack={this.handleGoBack}
            backButtonClassName={backButtonClassName}
            nextButtonClassName={nextButtonClassName}
          />
        </Form>
        { helpArea }
      </div>
    );
  }
}

WizardStep.propTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  className: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonText: PropTypes.string,
  backButtonClassName: PropTypes.string,
  nextButtonClassName: PropTypes.string,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  store: PropTypes.string,
  initialState: PropTypes.object,
  errorText: PropTypes.string,
  children: PropTypes.node,
  wizardHeader: PropTypes.object,
  helpArea: PropTypes.object,
};

WizardStep.defaultProps = {
  nextButtonText: 'Neste',
  backButtonText: 'Tilbake',
  className: 'wizard__step',
};

WizardStep.childContextTypes = {
  store: React.PropTypes.string,
};
