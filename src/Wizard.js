import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';

const getInitialStates = (steps) => {
  if (steps instanceof Array) {
    return steps.map((step) => { return step.initialState || {}; });
  }
  const initialStates = {};
  Object.keys(steps).forEach((stepName) => {
    initialStates[stepName] = steps[stepName].initialState;
  });
  return initialStates;
};

export default class Wizard extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.applyWizardProps = this.applyWizardProps.bind(this);
    this.state = {
      currentStep: props.firstStep || 0,
      lastStep: props.lastStep || props.steps.length - 1,
      wizardData: {},
      initialStates: getInitialStates(props.steps),
    };
  }

  componentWillReceiveProps(props) {
    if (typeof props.currentStep !== 'undefined' && props.currentStep !== this.state.currentStep) {
      this.setState({ currentStep: props.currentStep });
    }
  }

  componentWillUnmount() {
    if (!utils.isBrowser()) {
      return;
    }
    const steps = this.props.steps;
    if (steps instanceof Array) {
      steps.forEach((step, index) => {
        stores.remove(this.getStoreForStep(index));
      });
      return;
    }

    Object.keys(steps).forEach((stepName) => {
      stores.remove(this.getStoreForStep(stepName));
    });
  }

  getStoreForStep(step) {
    return `${this.props.store}-step-${step || this.state.currentStep}`;
  }

  getInitialStateForStep() {
    return this.state.initialStates[this.state.currentStep];
  }

  getStep() {
    const current = this.state.currentStep;
    const step = this.props.steps[current];
    const stepComponent = this.props.steps[current].component;

    return {
      index: current,
      component: this.applyWizardProps(stepComponent),
      store: this.getStoreForStep(),
      initialState: this.state.initialStates[current],
      stepHeader: step.stepHeader,
      stepFooter: step.stepFooter,
      helpArea: step.helpArea,
      overrideSubmit: step.overrideSubmit,
    };
  }

  getBackButton() {
    if (this.state.currentStep === 0) {
      return null;
    }
    return (<button onClick={this.goBack} className={this.props.backButtonClassName}>
      {this.props.backButtonText}
    </button>);
  }

  applyWizardProps(component) {
    const props = {
      store: this.getStoreForStep(),
      goNext: this.goNext,
      handleFinish: this.handleFinish,
      wizardData: this.state.wizardData,
      backButton: this.getBackButton(),
      initialState: this.getInitialStateForStep(),
    };
    return React.cloneElement(component, props);
  }

  goBack(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.props.goBack) {
      this.setState({ currentStep: this.props.goBack(this.state.wizardData, this.state.currentStep) });
      return;
    }
    this.setState({ currentStep: Math.max(0, this.state.currentStep - 1) });
  }

  goNext(formData) {
    const wizardData = Object.assign(this.state.wizardData, formData);
    this.setState({ wizardData });

    if (this.state.currentStep === this.state.lastStep) {
      this.handleFinish(formData);
      this.setState({ showReceipt: true });
      return;
    }
    if (this.props.goNext) {
      this.setState({ currentStep: this.props.goNext(wizardData, this.state.currentStep) });
      return;
    }
    if (this.props.steps instanceof Array) {
      this.setState({ currentStep: Math.min(this.props.steps.length - 1, this.state.currentStep + 1) });
      return;
    }
    throw new Error('Named step wizard without goNext override');
  }

  handleFinish(formData) {
    const wizardData = Object.assign(this.state.wizardData, formData);
    this.props.handleFinish(wizardData, (err) => {
      if (!err) {
        this.setState({ showReceipt: true });
      }
    });
  }

  render() {
    const step = this.getStep();
    return (<div className={this.props.className}>
      { this.state.showReceipt ?
        this.props.receipt(this.state.wizardData)
        :
        <div>
          { typeof this.state.lastStep === 'number' && this.props.progressIndicator && this.props.progressIndicator(step.index + 1, this.state.lastStep + 1)}
          { step.component }
        </div>
      }
    </div>);
  }
}

Wizard.propTypes = {
  steps: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  firstStep: PropTypes.string,
  lastStep: PropTypes.string,
  store: PropTypes.string,
  currentStep: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  progressIndicator: PropTypes.func,
  handleFinish: PropTypes.func.isRequired,
  backButtonClassName: PropTypes.string,
  backButtonText: PropTypes.string,
  className: PropTypes.string,
  receipt: PropTypes.func,
};

Wizard.defaultProps = {
  className: 'wizard',
  backButtonText: 'Back',
  backButtonClassName: 'button button__back',
};
