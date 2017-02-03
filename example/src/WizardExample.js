import React, { PropTypes } from 'react';
import { Wizard } from 'nocms-forms';

const Step = require('./Step');

const wizardStoreName = 'test-form-wizard';

const WizardHeader = (props) => {
  const { currentStep, steps } = props;
  return (
    <div>{steps[currentStep].title} - steg {currentStep+1} av <span>{steps.length}</span></div>
  );
};

const WizardExample = (props) => {
  const steps = [
    {title: 'Overskrift steg 1', component: <Step name="firststep" />},
    {title: 'Overskrift steg 2', component: <Step name="secondstep" />, initialState: { secondstep: 't2' }},
    {title: 'Overskrift steg 3', component: <Step name="thirdstep" />},
  ];
  return (
    <div>
      <h2>Wizard form example 1</h2>
      <div>
      <Wizard
       nextButtonText="Et steg frem"
       className="wizard_parent"
       wizardStepClassName="Hu hei"
       backButtonText="Et steg tilbake"
       nextButtonClassName="bling"
       store={wizardStoreName}
       steps={steps}
       wizardHeader={<WizardHeader steps={steps} />}
       nextButtonClassName="knapp neste-knapp"
      />
      </div>
    </div>
  );
};

WizardExample.propTypes = {
};

module.exports = WizardExample;
