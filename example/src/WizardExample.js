import React, { Component, PropTypes } from 'react';
import { Wizard } from 'nocms-forms';

const Step = require('./Step');

const wizardStoreName = 'test-form-wizard';

export default class WizardExample extends Component {

  constructor() {
    super();
    this.state = {
      steps: [
        {title: 'Overskrift steg 1', component: <Step name="firststep" />},
        {title: 'Overskrift steg 2', component: <Step name="secondstep" />, initialState: { secondstep: 't2' }},
        {title: 'Overskrift steg 3', component: <Step name="thirdstep" />},
      ],
    };
    this.progressIndicator = this.progressIndicator.bind(this);
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
         progressIndicator={this.progressIndicator}
         nextButtonText="Et steg frem"
         className="wizard_parent"
         wizardStepClassName="Hu hei"
         backButtonText="Et steg tilbake"
         nextButtonClassName="bling"
         store={wizardStoreName}
         steps={this.state.steps}
         nextButtonClassName="knapp neste-knapp"
        />
        </div>
      </div>
    );
  }
};

WizardExample.propTypes = {
};

module.exports = WizardExample;
