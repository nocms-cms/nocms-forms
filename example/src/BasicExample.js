import React from 'react';
import { Form, Field } from 'nocms-forms';
import FormData from './FormData';
import SourceCode from './SourceCode';
import { listenToGlobal, stopListenToGlobal } from 'nocms-events';

export default class BasicExample extends React.Component {
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
