import React from 'react';
import { Form, Field } from 'nocms-forms';
import FormData from './FormData';
import SourceCode from './SourceCode';
import Spinner from './Spinner';

const events = require('nocms-events');

const storeName = 'dependency-test-form';

export default class DependenciesExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVisibleIfYesFieldChange = this.handleVisibleIfYesFieldChange.bind(this);

    this.state = {
      errorText: '',
      submitted: false,
      formData: null,
      formKey: 0,
    };
    this.resetForm = this.resetForm.bind(this);
    events.listenTo('all-stores-cleared', this.resetForm);
  }

  handleReset() {
    this.setState({ submitted: false, formData: null });
  }

  handleSubmit(formData, callback) {
    this.setState({ submitted: true, formData });
    callback();
  }

  resetForm() {
    this.setState({ formKey: this.state.formKey + 1 });
  }

  fieldHider (dependecy) {
    return { hidden: dependecy.fieldToggler.value === 'No' }
  }

  handleVisibleIfYesFieldChange (dependency) {
    if (dependency.visibleIfYesField.value) {
      return dependency.visibleIfYesField.value.toUpperCase();
    }
    return '';
  }

  render() {
    const initialData = { fieldToggler: 'Yes' };

    const inputClasses = {
      controlGroupClass: 'custom-control-group',
      successWrapperClass: 'custom-success',
      errorWrapperClass: 'error',
      errorTextClass: 'custom-error',
      labelClass: 'custom-label',
    };

    return (
      <div>
        <SourceCode name="dependenciesExample" />
        <Form
          key={this.state.formKey}
          store={`${storeName}-${this.state.formKey}`}
          initialState={initialData}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          spinner={<Spinner />}
          submittingText='Vent litt'
        >
          <Field
            required
            type="radio"
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
            name="visibleIfYesField"
          />
          <Field
            type="hidden"
            name="hiddenField"
            dependOn="visibleIfYesField"
            dependencyFunc={this.handleVisibleIfYesFieldChange}
          />
        </Form>
        <FormData formData={this.state.formData} />
      </div>
    );
  }
}
