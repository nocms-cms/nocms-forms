import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wizard } from 'nocms-forms';
import { listenToGlobal } from 'nocms-events';
import FormData from './FormData';
import SourceCode from './SourceCode';
import EmptyStep from './EmptyStep.js';
import Step from './Step.js';
import SelectStep from './SelectStep.js';
import ComplexStep from './ComplexStep.js';

const wizardStoreName = 'test-form-wizard';


export default class WizardExample extends Component {

  constructor() {
    super();
    this.state = {
      steps: [
        { title: 'Step 1.5', component: <ComplexStep />},
        { title: 'Step 1', component: <Step name="firststep" /> },
        { title: 'Step 1.25', component: <SelectStep />},
        { title: 'Step 2', component: <Step name="secondstep" />, initialState: { secondstep: 't2' } },
        { title: 'Step 3', component: <Step name="thirdstep" />, initialState: { secondstep: 't3' } },
        { title: 'Step 4', component: <EmptyStep /> },
        { title: 'Step 5', component: <Step name="fifthstep" /> },
      ],
      wizardComponentKey: 0,
      formData: null,
    };
    this.progressIndicator = this.progressIndicator.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.resetWizard = this.resetWizard.bind(this);
    listenToGlobal('all-stores-cleared', this.resetWizard);
  }

  handleFinish(wizardData, cb) {
    this.setState({ formData: wizardData });
    cb(null);
  }

  renderReceipt(data){
    return <div>...and you're done!</div>;
  }

  progressIndicator(current, numberOfSteps){
    return (
      <div>{this.state.steps[current -1].title} - step {current} of <span>{numberOfSteps}</span></div>
    );
  }

  resetWizard() {
    this.setState({ wizardComponentKey: this.state.wizardComponentKey + 1 });
  }

  render() {
    return (
      <div>
        <h2>Wizard form example 1</h2>
        <SourceCode name="wizardExample" />
        <div>
        <Wizard
          key={wizardStoreName + this.state.wizardComponentKey}
          receipt={this.renderReceipt}
          progressIndicator={this.progressIndicator}
          nextButtonText="One step forward"
          formClass="custom-form-class"
          className="wizard_parent"
          currentStep={this.state.currentStep}
          wizardStepClassName="wizard-step"
          backButtonText="One step back"
          finishButtonText="Finish"
          nextButtonClassName="bling"
          store={wizardStoreName + this.state.wizardComponentKey}
          steps={this.state.steps}
          nextButtonClassName="button next-button"
          handleFinish={this.handleFinish}
        />
        <FormData formData={this.state.formData} />
        </div>
      </div>
    );
  }
};
