import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';

export default class StepOne extends Component {
  constructor(){
    super();
    this.fieldHider = this.fieldHider.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fieldHider (dependecy) {
    return { hidden: dependecy.fieldToggler.value === 'No' }
  }

  handleSubmit(formData, cb){
    cb();
    this.props.goNext(formData);
  }

  render(){
    return (
      <Form
        wizardStep
        key={this.props.store}
        store={this.props.store}
        onSubmit={this.handleSubmit}
      >
        <h2>Conditional hidden field</h2>
        <Field
          type="radio"
          required
          errorText="This field is required"
          label="Include field"
          name="fieldToggler"
          options={['Yes', 'No']}
        />
        <Field
          required
          errorText="This field is required"
          dependOn="fieldToggler"
          dependencyFunc={this.fieldHider}
          label="No value dependency"
          name="complexDependencyHandlerNoValueDependency"
        />
      </Form>
    );
  }
}
