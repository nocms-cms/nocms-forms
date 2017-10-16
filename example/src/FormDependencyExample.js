import React from 'react';
import { Form, Field } from 'nocms-forms';
import Spinner from './Spinner';

const events = require('nocms-events');

const storeName = 'test-form';

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDependency = this.handleDependency.bind(this);

    this.state = {
      errorText: '',
      submitted: false,
      formData: null,
      disabled: true,
      formKey: 0,
    };

    this.resetForm = this.resetForm.bind(this);
    events.listenTo('all-stores-cleared', this.resetForm);
  }

  handleSubmit(formData, callback) {
    this.setState({ submitted: true, formData });
    callback();
  }

  resetForm() {
    this.setState({ formKey: this.state.formKey + 1 });
  }

  handleDependency(dependency) {
    return `${dependency.text1.value} ${dependency.text2.value}`;
  }

  render() {
    return (
      <div>
        <Form
          key={this.state.formKey}
          submitButton="Submit"
          className="custom-forms-class"
          store={`${storeName}-${this.state.formKey}`}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          initialState={{ text1: 'a', text2: 'b' }}
          spinner={<Spinner />}
          submittingText='Please wait...'
        >
          <Field
            name="text1"
            label="Text 1"
          />
          <Field
            name="text2"
            label="Text 2"
          />
          <Field
            name="text3"
            label="Text 3"
            dependOn="text1,text2"
            dependencyFunc={this.handleDependency}
          />

        </Form>
        { this.state.formData ?
          <div>
            <h2>Form result</h2>
            <ul>
              { Object.keys(this.state.formData).map((field) => {
                return <li key={field}>{field} : {this.state.formData[field] === true ? 'true': this.state.formData[field]}</li>;
              })}
            </ul>
          </div>
        : null }
      </div>
    );
  }
}
