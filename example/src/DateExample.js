import React from 'react';
import { Form, Field } from 'nocms-forms';
import Spinner from './Spinner';
import moment from 'moment';

const { listenToGlobal } = require('nocms-events');

const storeName = 'date-test-form';

const dateFormats = [
  moment.ISO_8601,
  'DD.MM.YYYY',
  'MM/DD/YYYY',
];

const convertToIso = (dependency) => {
  const d = moment(dependency.requiredFormattedDate.value, dateFormats, true);
  if (d.isValid()) {
    return d.format('YYYY-MM-DD');
  }
  return '';
}

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.validateDate = this.validateDate.bind(this);
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

  validateDate (date) {
    let parseDate = this.parseDate(date);
    if(typeof parseDate !== 'undefined') {
      if (parseDate.isValid()) {
        return true;
      }
    }
    return false;
  }

  parseDate (date) {
    return moment(date, dateFormats, true);
  }

  render() {
    const initialData = {};

    const inputClasses = {
      controlGroupClass: 'custom-control-group',
      successWrapperClass: 'custom-success',
      errorWrapperClass: 'error',
      errorTextClass: 'custom-error',
      labelClass: 'custom-label',
    }

    return (
      <div>
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
            label="Optional date"
            name="optionalDate"
            type="date"
            errorText="Invalid date format"
          />
          <Field
            required
            label="Required date"
            name="requiredDate"
            type="date"
            errorText="Invalid date format"
          />
          <Field
            required
            type="date"
            placeholder="dd.mm.åååå or mm/dd/yyyy or yyyy-mm-dd"
            label="Required with special validation"
            name="requiredFormattedDate"
            errorText={'Invalid date'}
            validate={this.validateDate}
          />
          <Field
            type="hidden"
            name="isoFormattedDate"
            dependOn="requiredFormattedDate"
            dependencyFunc={convertToIso}
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
