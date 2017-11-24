import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wizard } from 'nocms-forms';
import HiddenFieldStep from './HiddenFieldStep';
import Step from './Step';

const { listenToGlobal } = require('nocms-events');

const wizardStoreName = 'test-form-wizard-with-hidden-fields';

export default class WizardExampleWithHiddenStepFields extends Component {

  constructor() {
    super();
    this.state = {
      steps: [
        { title: 'Step One', component: <HiddenFieldStep /> },
        { title: 'Step Two', component: <Step name="stepField" /> },
      ],
      wizardComponentKey: 0,
      currentStep: 0,
    };
    this.handleFinish = this.handleFinish.bind(this);
    this.resetWizard = this.resetWizard.bind(this);
    listenToGlobal('all-stores-cleared', this.resetWizard);
  }

  handleFinish(wizardData, cb) {
    console.log('Wizard completed with the following data', wizardData, 'What do you want to do with them?');
    cb(null);
  }

  renderReceipt(data){
    return <div>You are done :o)</div>;
  }

  resetWizard() {
    this.setState({ wizardComponentKey: this.state.wizardComponentKey + 1 });
  }

  render(){
    return (
      <div>
        <h2>Wizard example with hidden step fields</h2>
        <Wizard
         key={wizardStoreName + this.state.wizardComponentKey}
         receipt={this.renderReceipt}
         currentStep={this.state.currentStep}
         store={wizardStoreName + this.state.wizardComponentKey}
         steps={this.state.steps}
         handleFinish={this.handleFinish}
        />
      </div>
    );
  }
};
