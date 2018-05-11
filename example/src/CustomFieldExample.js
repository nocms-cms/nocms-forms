import React from 'react';
import { Form, Field } from 'nocms-forms';
import FormData from './FormData';
import SourceCode from './SourceCode';
import { listenToGlobal, stopListenToGlobal } from 'nocms-events';

class CustomField extends React.Component {
  handleClick(e) {
    this.props.handleChange({ x: e.clientX, y: e.clientY });
  }

  render() {
    return (
      <div style={{ backgroundColor: 'red', padding: '2em', color: 'white' }} onClick={this.handleClick.bind(this)}>click me</div>
    );
  }
}

export default class CustomFieldExample extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.validateCustomField = this.validateCustomField.bind(this);

    this.state = {
      name: null,
      formData: null,
    };
    listenToGlobal('all-stores-cleared', this.handleReset);
  }

  validateCustomField (value) {
    return value.x > 100;
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
        <SourceCode name="customFieldExample" />

        <Form
          store={'custom-field-example-form'}
          onSubmit={this.handleSubmit}
        >
          <Field
            required
            validate={this.validateCustomField}
            errorText="You need to make a better click"
            name="customValue"
            label="Select pixel"
          >
            <CustomField />
          </Field>
        </Form>

        { this.state.name ? <p>Thank you, {this.state.name}</p> : null }
        <FormData formData={this.state.formData} />
      </div>
    );
  }
}
