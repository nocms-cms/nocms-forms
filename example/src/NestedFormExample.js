import React, { Component } from 'react'
import { Form, SubForm, InputList, Field, InputListItem } from 'nocms-forms';

const sectionTypes = ['Choose...', 'Program', 'Heading', 'Details'];

class NestedFormExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialState: {
        firstname: 'Tom',
        lastname: 'Johnson',
        hobbies: [{ name: 'Soccer', description: 'Run after a ball'}]
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Form
        initialState={this.state.initialState}
        submitButtonText="Save"
        submitButtonClassName="btn btn-lg btn-submit"
        store="edit-camp-form"
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
              <Field name="description" label="Hobby description"/>
            </InputListItem>
          } 
        />
      </Form>
    )
  }

  handleSubmit(formData, cb) {
    console.log(formData);
    cb();
  }
}

export default NestedFormExample;