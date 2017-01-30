import React, { Component, PropTypes } from 'react';
import stores from 'nocms-stores';
import WizardStep from './WizardStep';

export default class Wizard extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.state = { currentStep: 0, lastStepIndex: props.steps.length - 1, wizardData: [] };
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
    return {
      index: current,
      component: this.props.steps[current],
      store: this.getStoreForStep(current),
      data: this.state.wizardData[current],
      isFirst: current === 0,
      isLast: current === this.props.steps.length - 1,
    };
  }

  goBack() {
    if (this.props.goBack) {
      this.setState({ currentStep: this.props.goBack(this.state.wizardData, this.state.currentStep) });
      return;
    }
    this.setState({ currentStep: Math.max(0, this.state.currentStep - 1) });
  }

  goNext(formData, cb) {
    if (this.props.goNext) {
      this.setState({ currentStep: this.props.goNext(this.state.wizardData, this.state.currentStep) });
      return;
    }
    this.setState({ currentStep: Math.min(this.state.lastStepIndex, this.state.currentStep + 1) });
  }

  addCurrentStep(component) {
    return React.cloneElement(component, {
      currentStep: this.state.currentStep,
    });
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
      wizardHeader,
      wizardFooter,
    } = this.props;
    const step = this.getStep();
    let wizardHeaderWithCurrentStep;
    let wizardFooterWithCurrentStep;
    if (wizardHeader) {
      wizardHeaderWithCurrentStep = this.addCurrentStep(wizardHeader);
    }
    if (wizardFooter) {
      wizardFooterWithCurrentStep = this.addCurrentStep(wizardFooter);
    }
    return (<div className={className}>
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
        wizardHeader={wizardHeader ? wizardHeaderWithCurrentStep : null}
        wizardFooter={wizardFooter ? wizardFooterWithCurrentStep : null}
      >
        {this.props.steps[this.state.currentStep].component}
      </WizardStep>
    </div>);
  }
}

Wizard.propTypes = {
  steps: PropTypes.array,
  store: PropTypes.string,
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  nextButtonClassName: PropTypes.string,
  backButtonClassName: PropTypes.string,
  nextButtonText: PropTypes.string,
  backButtonText: PropTypes.string,
  errorText: PropTypes.string,
  className: PropTypes.string,
  wizardStepClassName: PropTypes.string,
  spinner: PropTypes.object,
  wizardHeader: PropTypes.object,
  wizardFooter: PropTypes.object,
};

Wizard.defaultProps = {
  className: 'wizard',
};
