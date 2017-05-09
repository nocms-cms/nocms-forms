const React = require('react');
import { Form, Field } from 'nocms-forms';
const Spinner = require('./Spinner');

const storeName = 'test-form';

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.toggleDisabledField = this.toggleDisabledField.bind(this);
    this.state = {
      errorText: '',
      submitted: false,
      formData: null,
      disabled: true,
    };
  }

  getUppercaseName(dependency) {
    return dependency.name.value.toUpperCase();
  }

  handleReset() {
    this.setState({ submitted: false, formData: null });
  }

  handleSubmit(formData, callback) {
    this.setState({ submitted: true, formData });
    callback();
  }
  toggleDisabledField(e) {
    this.setState({ disabled: e.currentTarget.checked });
  }
  validateA(value){
    return value === 'a';
  }

  parseNoDate(value) {
    const parts = value.match(/^(\d\d)\.(\d\d)\.(\d{4})$/);
    if (!parts) {
      return '-';
    }
    return `${parts[3]}-${parts[2]}-${parts[1]}`;
  }

  render() {
    const radioOptions = [
      {
        label: 'Option 1',
        value: 'one',
      },
      {
        label: 'Option 2',
        value: 'two',
      },
    ];
    const multiCheckbox = [
      {
        label: 'Fiskekake',
        value: 'fish',
      },
      {
        label: 'Sjokoladekake',
        value: 'chocolate',
      },
      {
        label: 'Kjøttkake',
        value: 'meat',
      },
      {
        label: 'Bløtkake',
        value: 'soft',
      },
    ];
    const selectOptions = [
      'Option 1', 'Option 2',
    ];
    const multiSelectOptions = [
      {label: 'Option 1',
        value: 'opt1',
      },
      {
        label: 'Option 2',
        value: 'opt2',
      },
      {
        label: 'Option 3',
        value: 'opt3',
      },
      {
        label: 'Option 4',
        value: 'opt4',
      },
      {
        label: 'Option 5',
        value: 'opt5',
      },
      {
        label: 'Option 6',
        value: 'opt6',
      }
    ];
    const initialData = {
      checkbox: true
    };

    const inputClasses = {
      controlGroupClass: 'custom-control-group',
      successWrapperClass: 'custom-success',
      errorWrapperClass: 'error',
      labelClass: 'custom-label',
    }

    return (
      <div>
        <Form
          submitButton="Submit"
          className="custom-forms-class"
          store={storeName}
          initialState={initialData}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          spinner={<Spinner />}
          submittingText='Vent litt'
          errorTextClass='custom-error'
        >
          <Field
            required
            errorText="foo"
            {...inputClasses}
            store={storeName}
            label="Text field"
            name="name"
          />
          <Field
            {...inputClasses}
            dependOn="name"
            dependencyFunc={this.getUppercaseName}
            store={storeName}
            label="Dependent text field"
            name="aggregatedName"
          />
          <Field
            required
            {...inputClasses}
            label="Required text field with e-mail validation"
            name="email"
            errorText="Wrong e-mail"
            validate="email"
          />
          <Field
            notRequiredMark="Not required"
            {...inputClasses}
            label="Not required text field marked as not required"
            name="email"
            errorText="Wrong e-mail"
            validate="email"
          />
          <Field
            label="Toggle disabled field"
            name="disabledToggler"
            {...inputClasses}
            type="checkbox"
            onChange={this.toggleDisabledField}
          />
          <Field
            required
            disabled={this.state.disabled}
            {...inputClasses}
            label="Required disabled field"
            name="requriedDisabled"
            errorText="This should not happen"
            validate="notEmpty"
          />
          <Field
            required
            label="Required text field"
            name="required"
            errorText="Field is required"
            validate="notEmpty"
          />
          <Field
            type="radio"
            {...inputClasses}
            required
            errorText="Oh no"
            label="Radio buttons"
            name="radio"
            options={radioOptions}
          />
          <Field
            type="select"
            {...inputClasses}
            label="Select"
            options={selectOptions}
            name="select"
            emptyLabel="Velg noe gøy"
            required
          />
          <Field
            type="select"
            {...inputClasses}
            label="Select multiple"
            options={multiSelectOptions}
            name="multiselect"
            emptyLabel="Velg flere gøye ting"
            multiple
            required
            errorText="Du må gjøre et valg"
          />
          <Field
            type="textarea"
            {...inputClasses}
            label="Text area"
            name="textarea"
            required
            errorText="Du må gjøre et valg"
          />
          <Field
            type="hidden"
            name="hiddenName"
            dependOn="name"
            dependencyFunc={this.getUppercaseName}
          />
          <Field
            required
            name="customValidationText"
            label="Custom validation func (a)"
            errorText="Field must be a"
            validate={this.validateA}
          />
          <Field
            type="checkbox"
            label="Check me out"
            name="checkbox"
          />
          <Field
            label="Some date"
            name="date"
            type="date"
            errorText="Invalid date format"
            validate="date"
            dateParser={this.parseNoDate}
          />
          <Field
            label="Check all your favourite cakes that applies"
            name="cakes"
            type="checkbox"
            options={multiCheckbox}
            multiple
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
