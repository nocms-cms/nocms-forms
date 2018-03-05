/* eslint class-methods-use-this: off */
import React, { Component } from 'react';
import { Form, SubForm, InputList, Field, InputListItem, Wizard } from 'nocms-forms';
import Step1 from './Step';
import StepWithInputList from './StepWithInputList';
import StepWithSubForm from './StepWithSubForm';

const wizardStoreName = 'test-nested-form-wizard';

class NestedFormInWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps:
        [
          { title: 'Nested 2', component: <StepWithInputList name="wizardNestedInputList" />, initialState: { hobbies: [{ name: 'foo', description: 'bar' }]} },
          { title: 'Nested 1', component: <Step1 name="wizardNestedOne" /> },
          { title: 'Nested 1', component: <StepWithSubForm name="wizardNestedSubform" />, initialState: { address: { street: 'Dude Road', city: '22D', zip: '1235' }} },
          { title: 'Nested 3', component: <Step1 name="wizardNestedThree" /> },
        ],
    };

    this.handleFinish = this.handleFinish.bind(this);
  }

  handleFinish(wizardData, cb) {
    console.log('Wizard completed with the following data', wizardData, 'What do you want to do with them?');
    cb(null);
  }

  renderReceipt(data){
    console.log('Receipt data', data);
    return <div>Kvittering</div>;
  }

  render() {
    return (
      <div>
        <h3>Nested form in Wizard</h3>
        <Wizard
          key="nested-wizard"
          formClass="custom-form-class"
          className="wizard_parent"
          currentStep={this.state.currentStep}
          wizardStepClassName="Hu hei"
          backButtonText="Et steg tilbake"
          finishButtonText="Fullfør"
          nextButtonClassName="bling"
          store={wizardStoreName}
          steps={this.state.steps}
          handleFinish={this.handleFinish}
          receipt={this.renderReceipt}
        />
      </div>
    );
  }
}

export default NestedFormInWizard;
