import React from 'react';
import { Form, Field } from 'nocms-forms';
import FormData from './FormData';
import SourceCode from './SourceCode';
import { listenToGlobal, stopListenToGlobal } from 'nocms-events';

export default class ContextValidationExample extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    
    this.state = {
      name: null,
      formData: null,
    };
    listenToGlobal('all-stores-cleared', this.handleReset);
  }

  componentWillUnmount() {
    stopListenToGlobal('all-stores-cleared', this.handleReset);
  }

  handleSubmit(formData, imDone) {
    this.setState({ name: formData.name, formData, });
    imDone();
  }

  handleReset() {
    this.setState({ submitted: false, formData: null });
  }

  validateLargeNumber (value, store) {
    let largeNumber;
    let smallNumber;
    try {
      largeNumber = parseInt(value, 10);
      smallNumber = parseInt(store.smallNumber.value, 10);
    } catch (ex) {
      return false;
    }

    return largeNumber > smallNumber;
  }

  render() {
    return (
      <div>
        <SourceCode name="basicExample" />

        <Form
          store={'basic-example-form'}
          onSubmit={this.handleSubmit}
        >
          <Field
            required
            label="Small number"
            name="smallNumber"
            type="number"
          />
          <Field
            required
            label="Large number"
            errorText="Large number must be larger than small number"
            name="largeNumber"
            type="number"
            validate={this.validateLargeNumber}
          />
        </Form>

        { this.state.name ? <p>Thank you, {this.state.name}</p> : null }
        <FormData formData={this.state.formData} />
      </div>
    );
  }
}
