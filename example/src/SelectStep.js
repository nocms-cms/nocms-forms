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
    const radioOptions = [
      {
        label: 'Ja',
        value: 'yes'
      },
      {
        label: 'Nei',
        value: 'no',
      }
    ];
    return (
      <Form
        wizardStep
        key={this.props.store}
        onSubmit={this.handleSubmit}
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
          emptyLabel="Gjør et valg"
         />
         <Field
           required
           label="Radio"
           name="radio"
           errorText="Oisann"
           validate="notEmpty"
           type="radio"
           required
           options={radioOptions}
          />
          <Field
            required
            label="Radio"
            name="radio2"
            errorText="Oisann igjen"
            validate="notEmpty"
            type="radio"
            required
            options={radioOptions}
           />
      </Form>
    );
  }
}
