import React from 'react';
import { Form, Field } from 'nocms-forms';
import SourceCode from './SourceCode';
import FormData from './FormData';
import Spinner from './Spinner';
import { listenToGlobal, stopListenToGlobal } from 'nocms-events';

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

  componentWillUnmount() {
    stopListenToGlobal('all-stores-cleared', this.handleReset);
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
 
    const multiCheck = [
      {
        label: 'Carrot',
        value: 'one',
      },
      {
        label: 'Apple',
        value: 'two',
      },
      {
        label: 'Orange',
        value: 'three',
      },
    ]
    const inputClasses = {
      controlGroupClass: 'custom-control-group',
      successWrapperClass: 'custom-success',
      errorWrapperClass: 'error',
      errorTextClass: 'custom-error',
      labelClass: 'custom-label',
    };

    const initialData = {
      checkbox: true,
      initialDependencyText: 'foo',
      multiCheckWithDefault: ['two', 'three'],
    };

    return (
      <div>
        <SourceCode name="formExample" />
        <Form
          key={this.state.formKey}
          submitButton="Submit"
          className="custom-forms-class"
          store={`${storeName}-${this.state.formKey}`}
          initialState={initialData}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          spinner={<Spinner />}
          submittingText='Please wait'
        >
          <Field
            required
            errorText="Hey! I'm required"
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
            label="Required email"
            name="email"
            errorText="Wrong e-mail"
            validate="email"
          />
          <Field
            notRequiredMark="Not required"
            {...inputClasses}
            label="Unrequired email using notREquiredMark prop"
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
            errorText="Please select me"
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
            emptyLabel="Choooe something"
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
            emptyLabel="Choooe something"
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
            emptyLabel="Choooe multiple somethings"
            multiple
          />
          <Field
            type="checkbox"
            {...inputClasses}
            label="Check, preselected"
            options={multiCheck}
            name="multiCheckWithDefault"
            emptyLabel="Choooe multiple somethings"
            multiple
          />
          <Field
            label="Some date in 2017"
            name="date"
            type="date"
            errorText="Invalid date format"
            min="2017-01-01"
            max="2017-12-31"
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

        <FormData formData={this.state.formData} />
      </div>
    );
  }
}
