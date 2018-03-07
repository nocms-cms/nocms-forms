import React from 'react';
import { Form, Field } from 'nocms-forms';
import FormData from './FormData';
import SourceCode from './SourceCode';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: null,
      formData: null,
    }
  }

  handleSubmit(formData, imDone) {
    this.setState({ name: formData.name, formData, });
    imDone();
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
            errorText="Hey! I'm required"
            label="What's your name"
            name="name"
          />
        </Form>

        { this.state.name ? <p>Thank you, {this.state.name}</p> : null }
        <FormData formData={this.state.formData} />
      </div>
    );
  }
}
