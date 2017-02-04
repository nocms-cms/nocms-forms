import React, { Component, PropTypes } from 'react';
import { Wizard } from 'nocms-forms';

const Step = require('./Step');

const wizardStoreName = 'test-form-wizard';

export default class WizardExample extends Component {

  constructor() {
    super();
    this.state = {
      steps: [
        {title: 'Overskrift steg 1', component: <Step name="firststep" />, stepFooter: <div>Jeg er en step footer</div> },
        {title: 'Overskrift steg 2', component: <Step name="secondstep" />, initialState: { secondstep: 't2' }, stepHeader: <div>Jeg er en step header</div>},
        {title: 'Overskrift steg 3', component: <Step name="thirdstep" />, helpArea: <div>Jeg er et hjelpeområde</div> },
      ],
    };
    this.progressIndicator = this.progressIndicator.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  handleFinish(wizardData, cb) {
    console.log(wizardData);
    cb(null);
  }

  renderReceipt(data){
    console.log(data);
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
