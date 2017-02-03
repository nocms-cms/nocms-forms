import React, { Component, PropTypes } from 'react';
import stores from 'nocms-stores';
import WizardStep from './WizardStep';

export default class Wizard extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.state = {
      currentStep: 0,
      lastStepIndex: props.steps.length - 1,
      wizardData: {},
      initialStates: props.steps.map(step => step.initialState || {}),
    };
  }

  componentWillUnmount() {
    if (global.environment !== 'server') {
      this.props.steps.forEach((step, index) => {
        stores.remove(this.getStoreForStep(index));
      });
    }
  }

  getStoreForStep(index) {
    return `${this.props.store}-step-${index}`;
  }

  getStep() {
    const current = this.state.currentStep;
    const step = this.props.steps[current];
    return {
      index: current,
      component: this.props.steps[current].component,
      store: this.getStoreForStep(current),
      isFirst: current === 0,
      isLast: current === this.props.steps.length - 1,
      initialState: this.state.initialStates[current],
      stepHeader: step.stepHeader,
      stepFooter: step.stepFooter,
      helpArea: step.helpArea,
    };
  }

  goBack() {
    if (this.props.goBack) {
      this.setState({ currentStep: this.props.goBack(this.state.wizardData, this.state.currentStep) });
      return;
    }
    this.setState({ currentStep: Math.max(0, this.state.currentStep - 1) });
  }

  goNext(formData) {
    const wizardData = Object.assign(this.state.wizardData, formData);
    this.setState({ wizardData });

    if (this.props.goNext) {
      this.setState({ currentStep: this.props.goNext(wizardData, this.state.currentStep) });
      return;
    }
    this.setState({ currentStep: Math.min(this.state.lastStepIndex, this.state.currentStep + 1) });
  }

  render() {
    const {
      className,
      wizardStepClassName,
      errorText,
      nextButtonText,
      backButtonText,
      backButtonClassName,
      nextButtonClassName,
      spinner,
      steps,
    } = this.props;
    const step = this.getStep();
    return (<div className={className}>
      { this.props.progressIndicator && this.props.progressIndicator(step.index + 1, this.state.lastStepIndex + 1)}
      { this.state.showReceipt ?
        this.props.receiptStep
      :
        <WizardStep
          goNext={this.goNext}
          goBack={this.goBack}
          className={wizardStepClassName}
          {...step}
          nextButtonText={nextButtonText}
          backButtonText={backButtonText}
          nextButtonClassName={nextButtonClassName}
          backButtonClassName={backButtonClassName}
          errorText={errorText}
          spinner={spinner}
          noOfSteps={steps.length}
        >
          {step.component}
        </WizardStep>
      }
    </div>);
  }
}

Wizard.propTypes = {
  steps: PropTypes.array,
  store: PropTypes.string,
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  progressIndicator: PropTypes.func,
  nextButtonClassName: PropTypes.string,
  backButtonClassName: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonText: PropTypes.string,
  errorText: PropTypes.string,
  className: PropTypes.string,
  wizardStepClassName: PropTypes.string,
  spinner: PropTypes.object,
  receiptStep: PropTypes.object,
};

Wizard.defaultProps = {
  className: 'wizard',
};
