import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wizard } from 'nocms-forms';
import EmptyStep from './EmptyStep.js';
import Step from './Step.js';
import SelectStep from './SelectStep.js';
import ComplexStep from './ComplexStep.js';
const events = require('nocms-events');

const wizardStoreName = 'test-form-wizard';

export default class WizardExampleWithCustomNavigation extends Component {

  constructor() {
    super();
    this.state = {
      steps: {
        login: { title: 'Overskrift steg 1', component: <Step name="namedFirstStep" />, initialState: { namedFirstStep: 'initial value' } },
        contactInfo: { title: 'Overskrift steg 2', component: <Step name="namedSecondStep" />, initialState: { namedSecondStep: 'second step value' } },
        address: { title: 'Overskrift steg 3', component: <SelectStep name="namedThirdStep" /> },
        description: { title: 'Overskrift steg 4', component: <Step name="namedFurthStep" />},
        summary: { title: 'Overskrift steg 5', component: <Step name="namedFifthStep" /> },
      },
      currentStep: 'login',
      wizardComponentKey: 0,
    };
    this.renderNavigation = this.renderNavigation.bind(this);
    this.handleStepNavigation = this.handleStepNavigation.bind(this);

    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);
    this.resetWizard = this.resetWizard.bind(this);
    events.listenTo('all-stores-cleared', this.resetWizard)
  }

  handleFinish(wizardData, cb) {
    console.log('Wizard completed with the following data', wizardData, 'What do you want to do with them?');
    cb(null);
  }

  renderReceipt(data){
    console.log('Receipt data', data);
    return <div>Kvittering</div>;
  }

  resetWizard() {
    this.setState({ wizardComponentKey: this.state.wizardComponentKey + 1 });
  }

  progressIndicator(current, numberOfSteps){
    return (
      <div>{this.state.steps[current -1].title} - steg {current} av <span>{numberOfSteps}</span></div>
    );
  }

  goNext(data, step) {
    const flow = ['login', 'contactInfo', 'description', 'address', 'summary'];
    const stepIndex = flow.indexOf(step);
    return flow[Math.min(flow.length, stepIndex + 1)];
  }

  goBack(data, step) {
    const flow = ['login', 'contactInfo', 'description', 'address', 'summary'];
    const stepIndex = flow.indexOf(step);
    return flow[Math.max(0, stepIndex - 1)];
  }

  renderNavigation() {
    const steps = this.state.steps;
    return (
      <ul>
        { Object.keys(steps).map((step) => {
          return (
            <li key={`navigate_to_${step}`}>
              <a href={`#${step}`} onClick={this.handleStepNavigation}>{steps[step].title}</a>
            </li>
          );
        })}
      </ul>
    );
  }

  handleStepNavigation(e) {
    this.setState({ currentStep: e.target.hash.substring(1) });
  }

  render(){
    return (
      <div>
        <h2>Wizard example - custom navigation</h2>
        <div>
        {this.renderNavigation()}
        <Wizard
          key={wizardStoreName + this.state.wizardComponentKey}
          receipt={this.renderReceipt}
          firstStep='login'
          lastStep='summary'
          currentStep={this.state.currentStep}
          goNext={this.goNext}
          goBack={this.goBack}
          progressIndicator={this.progressIndicator}
          nextButtonText="Et steg frem"
          formClass="custom-form-class"
          className="wizard_parent"
          wizardStepClassName="Hu hei"
          backButtonText="Et steg tilbake"
          finishButtonText="Fullfør"
          nextButtonClassName="bling"
          store={wizardStoreName + this.state.wizardComponentKey}
          steps={this.state.steps}
          nextButtonClassName="knapp neste-knapp"
          handleFinish={this.handleFinish}
        />
        </div>
      </div>
    );
  }
};

WizardExampleWithCustomNavigation.propTypes = {
};

module.exports = WizardExampleWithCustomNavigation;
