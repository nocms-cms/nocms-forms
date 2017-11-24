import React from 'react';
import { Form, Field } from 'nocms-forms';
import Spinner from './Spinner';

const { listenToGlobal } = require('nocms-events');

const storeName = 'test-form';

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDependency = this.handleDependency.bind(this);
    this.handleDependency2 = this.handleDependency2.bind(this);

    this.state = {
      errorText: '',
      submitted: false,
      formData: null,
      disabled: true,
      formKey: 0,
    };

    this.resetForm = this.resetForm.bind(this);
    listenToGlobal('all-stores-cleared', this.resetForm);
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

  handleDependency2(dependency) {
    const d = dependency.field1 || dependency.field2 || dependency.field3;
    const val = parseInt(d.value);
    if (isNaN(val)) {
      return `.${val}`;
    }
    return `${val * 2}`;
  }

  render() {
    return (
      <div>
        <h1>Advanced dependencies example</h1>
        <Form
          key={this.state.formKey}
          submitButton="Submit"
          className="custom-forms-class"
          store={`${storeName}-${this.state.formKey}`}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          initialState={{ text1: 'a', text2: 'b', field1: '1' }}
          spinner={<Spinner />}
          submittingText='Please wait...'
        >
          <h2>Dependency upon two fields</h2>
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
            label="Text 1 + Text 2"
            dependOn="text1,text2"
            dependencyFunc={this.handleDependency}
          />
          <h2>Dependency chain</h2>
          <Field
            name="field1"
            label="Field 1"
          />
          <Field
            name="field2"
            label="Field 2"
            dependOn="field1"
            dependencyFunc={this.handleDependency2}
          />
          <Field
            name="field3"
            label="Field 3"
            dependOn="field2"
            dependencyFunc={this.handleDependency2}
          />
          <Field
            name="field4"
            label="Field 4"
            dependOn="field3"
            dependencyFunc={this.handleDependency2}
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
