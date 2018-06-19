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
    this.setState({ formData, });
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
          <Field name="firstname" label="First name" autoComplete="nope" />
          <Field name="lastname" label="Last name" autoComplete="nope" />
          <h3>Nicknames</h3>

          <SubForm name="nickname">
            <Field name="nickname" label="Nickname" autoComplete="nope" />
          </SubForm>

          <h3>Address</h3>
          <InputList
            name="addresses"
            of={
              <InputListItem>
                <Field name="street" label="Street" autoComplete="street-address" />
                <Field name="city" label="City" autoComplete="address-level2" />
                <Field name="zip" label="Zip code" autoComplete="postal-code" />
              </InputListItem>
            }
          />

          <h3>Hobbies</h3>
          <InputList
            name="hobbies"
            of={
              <InputListItem>
                <Field name="name" label="Hobby name" autoComplete="nope" />
                <Field name="description" label="Hobby description" autoComplete="nope" />
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
