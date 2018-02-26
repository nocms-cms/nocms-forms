/* eslint class-methods-use-this: off */
import React, { Component } from 'react';
import { Form, SubForm, InputList, Field, InputListItem, Wizard } from 'nocms-forms';
import Step1 from './Step';
import StepWithNesting from './StepWithNesting';

const wizardStoreName = 'test-nested-form-wizard';

class NestedFormExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialState: {
        firstname: 'Tom',
        lastname: 'Johnson',
        nicknames: [{ nickname: 'Tommy'}, { nickname: 'Tim'}]
        // hobbies: [{ name: 'Soccer', description: 'Run after a ball'}]
      },
      steps:
        [
          { title: 'Overskrift steg 1', component: <Step1 name="wizardNestedOne" /> },
          { title: 'Overskrift steg 2', component: <StepWithNesting name="wizardNestedSecond" /> },
          { title: 'Overskrift steg 3', component: <Step1 name="wizardNestedThree" /> },
        ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  handleFinish(wizardData, cb) {
    console.log('Wizard completed with the following data', wizardData, 'What do you want to do with them?');
    cb(null);
  }

  handleSubmit(formData, cb) {
    console.log(formData);
    cb();
  }

  render() {
    return (
      <div>
        <h2>Nested form</h2>
        <Form
          initialState={this.state.initialState}
          submitButtonText="Save"
          submitButtonClassName="btn btn-lg btn-submit"
          store="nested-form"
          submittingText="Saving..."
          onSubmit={this.handleSubmit}
        >
          <Field name="firstname" label="First name" />
          <Field name="lastname" label="Last name" />
          <h3>Nicknames</h3>
          <InputList
            name="nicknames"
            of={
              <InputListItem>
                <Field name="nickname" label="Nickname" />
              </InputListItem>
            }
          />
          <h3>Address</h3>
          <SubForm name="address">
            <Field name="street" label="Street" />
            <Field name="city" label="City" />
            <Field name="zip" label="Zip code" />
          </SubForm>
          <h3>Hobbies</h3>
          <InputList
            name="hobbies"
            of={
              <InputListItem>
                <Field name="name" label="Hobby name" />
                <Field name="description" label="Hobby description" />
              </InputListItem>
            }
          />
        </Form>
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
        />
      </div>
    );
  }
}

export default NestedFormExample;
