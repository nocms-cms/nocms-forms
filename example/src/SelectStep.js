import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';

export default class SelectStep extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errorText: null,
    };
  }

  handleSubmit(formData, cb){
    cb();
    this.props.goNext(formData);
  }

  render(){
    const singleSelectOptions = [
      'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6',
    ];
    return (
      <Form
        wizardStep
        key={this.props.store}
        onSubmit={this.handleSubmit}
        initialState={this.props.initialState}
        className={this.props.formClass}
        store={this.props.store}
        errorText={this.state.errorText}
        backButton={this.props.backButton}
      >
        <h2>Step: {this.props.name}</h2>
        <Field
          required
          label="Label"
          name="select"
          errorText="Oisann"
          validate="notEmpty"
          type="select"
          options={singleSelectOptions}
         />
      </Form>
    );
  }
}
