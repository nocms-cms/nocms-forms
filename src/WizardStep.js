import React, { Component, PropTypes } from 'react';
import Form from './Form';
import WizardControlButtons from './WizardControlButtons';

export default class WizardStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: props.errorText,
    };
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  handleSubmit(formData, cb) {
    const callback = this.props.isLast ? this.props.handleFinish : this.props.goNext;
    if (this.props.overrideGoNext) {
      this.props.overrideGoNext(formData, (err) => {
        if (err) {
          cb(err);
          this.setState({ errorText: err });
          return;
        }
        cb();
        callback(formData);
      });
      return;
    }
    cb();
    callback(formData);
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
      backButtonClassName,
      nextButtonClassName,
      helpArea,
      stepHeader,
      stepFooter,
      finishButtonClassName,
      formClass,
    } = this.props;

    return (
      <div className={className}>
        { stepHeader }
        <Form
          wizardStep
          key={store}
          onSubmit={this.handleSubmit}
          initialState={initialState}
          className={formClass}
          store={store}
          errorText={this.state.errorText}
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
  overrideGoNext: PropTypes.func,
  className: PropTypes.string,
  formClass: PropTypes.string,
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
