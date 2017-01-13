import React, { Component, PropTypes } from 'react';
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
        global.NoCMS.deleteStore(this.getStoreForStep(index));
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

  render() {
    const step = this.getStep();
    return (<div>
      <WizardStep
        goNext={this.goNext}
        goBack={this.goBack}
        store={step.store}
        stepState={step.data}
        showBackButton={!step.isFirst}
        showNextButton={!step.isLast}
      >
        {this.props.steps[this.state.currentStep]}
      </WizardStep>

    </div>);
  }
}

Wizard.propTypes = {
  steps: PropTypes.array,
  store: PropTypes.object,
  goBack: PropTypes.func,
  goNext: PropTypes.func,
};
