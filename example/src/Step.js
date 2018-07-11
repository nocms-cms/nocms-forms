import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';

export default class Step extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableNextButton = this.disableNextButton.bind(this);
    this.state = {
      errorText: null,
      value: '',
    };
  }

  disableNextButton() {
    return this.state.value === 'disableNext';
  }

  handleSubmit(formData, cb){
    cb();
    this.props.goNext(formData);
  }

  render() {
    const onChange = (evt) => {
      let newState = Object.assign({}, this.state);
      newState.value = evt.target.value;
      this.setState(newState);
    };

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
        disableNextButton={this.disableNextButton}
      >
        <h2>Step: {this.props.name}</h2>
        <Field
          required
          label="Label"
          name={this.props.name}
          value={this.state.value}
          onChange={onChange}
          errorText="Hey! I'm required"
          validate="notEmpty"
         />
      </Form>
    );
  }
}
