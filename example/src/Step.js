import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';

export default class Step extends Component {
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

  render() {
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
        submitButtonText="Next"
      >
        <h2>Step: {this.props.name}</h2>
        <Field
          required
          label="Label"
          name={this.props.name}
          errorText="Hey! I'm required"
          validate="notEmpty"
         />
      </Form>
    );
  }
}
