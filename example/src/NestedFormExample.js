/* eslint class-methods-use-this: off */
import React, { Component } from 'react';
import { Form, SubForm, InputList, Field, InputListItem, Wizard } from 'nocms-forms';
import FormData from './FormData';
import SourceCode from './SourceCode';

class NestedFormExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialState: {
        firstname: 'Tom',
        lastname: 'Johnson',
        nicknames: [{ nickname: 'Tommy'}, { nickname: 'Tim'}],
        hobbies: [{ name: 'Soccer', description: 'Run after a ball'}],
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData, cb) {
    this.setState({ formData, })
    cb();
  }

  render() {
    return (
      <div>
        <h2>Nested form</h2>
        <SourceCode name="nestedFormExample" />
        
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
        <FormData formData={this.state.formData} />        
      </div>
    );
  }
}

export default NestedFormExample;
