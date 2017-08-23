import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wizard } from 'nocms-forms';
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
        {title: 'Overskrift steg 1.5', component: <ComplexStep />},
        {title: 'Overskrift steg 1', component: <Step name="firststep" /> },
        {title: 'Overskrift steg 1.25', component: <SelectStep />},
        {title: 'Overskrift steg 2', overrideGoNext: this.overrideGoNext, component: <Step name="secondstep" />, initialState: { secondstep: 't2' }},
        {title: 'Overskrift steg 3', component: <Step name="thirdstep" />, initialState: { secondstep: 't3' }},
        {title: 'Overskrift steg 4', component: <EmptyStep /> },
        {title: 'Overskrift steg 5', component: <Step name="fifthstep" /> },
      ],
    };
    this.progressIndicator = this.progressIndicator.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  overrideGoNext(formData, cb) {
    console.log('Step goNext wrapped', formData);
    cb(null);
  }

  handleFinish(wizardData, cb) {
    console.log('Wizard completed with the following data', wizardData, 'What do you want to do with them?');
    cb(null);
  }

  renderReceipt(data){
    console.log('Receipt data', data);
    return <div>Kvittering</div>;
  }

  progressIndicator(current, numberOfSteps){
    return (
      <div>{this.state.steps[current -1].title} - steg {current} av <span>{numberOfSteps}</span></div>
    );
  }

  render(){
    return (
      <div>
        <h2>Wizard form example 1</h2>
        <div>
        <Wizard
         receipt={this.renderReceipt}
         progressIndicator={this.progressIndicator}
         nextButtonText="Et steg frem"
         formClass="custom-form-class"
         className="wizard_parent"
         wizardStepClassName="Hu hei"
         backButtonText="Et steg tilbake"
         finishButtonText="Fullfør"
         nextButtonClassName="bling"
         store={wizardStoreName}
         steps={this.state.steps}
         nextButtonClassName="knapp neste-knapp"
         handleFinish={this.handleFinish}
        />
        </div>
      </div>
    );
  }
};

WizardExample.propTypes = {
};

module.exports = WizardExample;
