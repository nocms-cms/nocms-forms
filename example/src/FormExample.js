import React from 'react';
import { Form, Field } from 'nocms-forms';
import Spinner from './Spinner';

const { listenToGlobal } = require('nocms-events');

const storeName = 'test-form';

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.toggleDisabledField = this.toggleDisabledField.bind(this);
    this.complexDependencyValueHandler = this.complexDependencyValueHandler.bind(this);
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

  getUppercaseName(dependency) {
    if (dependency.name) {
      return dependency.name.value.toUpperCase();
    }
    if (dependency.initialDependencyText) {
      return dependency.initialDependencyText.value.toUpperCase();
    }
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

  resetForm() {
    this.setState({ formKey: this.state.formKey + 1 });
  }

  complexDependencyValueHandler(dependency) {
    const value = dependency.complexDependencyValue.value;
    if (value === 'example1') {
      return {
        value,
        disabled: true,
        hidden: false,
        readOnly: false,
        controlGroupClass: value,
      };
    }
    if (value === 'example2') {
      return {
        value,
        disabled: false,
        readOnly: true,
        hidden: false,
        controlGroupClass: value,
      };
    }
    if (value === 'example3') {
      return {
        value,
        disabled: false,
        readOnly: false,
        hidden: true,
        controlGroupClass: value,
      };
    }
    return {
      value,
      disabled: value === 'disabled',
      hidden: value === 'hidden',
      readOnly: value === 'readOnly',
    };
  }

  fieldHider (dependecy) {
    return { hidden: dependecy.fieldToggler.value === 'one' }
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
    const selectOptions = [
      'Option 1', 'Option 2',
    ];
    const multiSelectOptions = [
      'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6',
    ];
    const groupedSelectOptions = [
      {
        groupLabel: 'Fruit',
        options: [{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana'}]
      },
      {
        groupLabel: 'Vegetable',
        options: [{label: 'Carrot', value: 'carrot'}, {label: 'Potato', value: 'potato'}, {label: 'Garlic', value: 'garlic'}]
      }
    ]
    const initialData = {
      checkbox: true,
      initialDependencyText: 'foo',
    };

    const multiCheck = [
      {
        label: 'Carrot',
        value: 'one',
      },
      {
        label: 'Apple',
        value: 'two',
      },
    ]
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
          submitButton="Submit"
          className="custom-forms-class"
          store={`${storeName}-${this.state.formKey}`}
          initialState={initialData}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          spinner={<Spinner />}
          submittingText='Vent litt'
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
            name="notRequiredField"
            errorText="Wrong e-mail"
            validate="email"
          />
          <label>
            <input type="checkbox" checked={this.state.disabled} onChange={this.toggleDisabledField} />
            Toggle disabled field
          </label>
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
            readOnly
          />
          <Field
            type="select"
            {...inputClasses}
            label="Select multiple"
            options={multiSelectOptions}
            name="multiselect"
            multiple
          />
          <Field
            type="select"
            {...inputClasses}
            label="Select from groups"
            options={groupedSelectOptions}
            name="groupedselect"
            emptyLabel="Velg noe gøy"
            groupedOptions
          />
          <Field
            type="textarea"
            {...inputClasses}
            label="Text area"
            name="textarea"
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
            type="checkbox"
            {...inputClasses}
            label="Check"
            options={multiCheck}
            name="multicheck"
            emptyLabel="Velg flere gøye ting"
            multiple
          />
          <Field
            label="Some date.."
            name="date"
            type="date"
            errorText="Invalid date format"
            min="2017-01-01"
            max="2017-06-01"
          />
          <Field
            {...inputClasses}
            label="Value from initial state"
            name="initialDependencyText"
          />
          <Field
            {...inputClasses}
            dependOn="initialDependencyText"
            dependencyFunc={this.getUppercaseName}
            label="Transforms initialDependencyText to uppercase"
            name="initialDependencyTextUpperCase"
          />

          <Field
            {...inputClasses}
            label="Complex dependency value"
            name="complexDependencyValue"
          />
          <Field
            {...inputClasses}
            dependOn="complexDependencyValue"
            dependencyFunc={this.complexDependencyValueHandler}
            label="disabled, hidden, value"
            name="complexDependencyHandler"
          />

          <Field
            type="radio"
            {...inputClasses}
            required
            errorText="Oh no"
            label="Conditional hider"
            name="fieldToggler"
            options={radioOptions}
          />
          <Field
            {...inputClasses}
            dependOn="fieldToggler"
            dependencyFunc={this.fieldHider}
            label="No value dependency"
            name="complexDependencyHandlerNoValueDependency"
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
