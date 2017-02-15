const React = require('react');
import { Form, Input, RadioButtons, Select, TextArea } from 'nocms-forms';
const Spinner = require('./Spinner');

const storeName = 'test-form';

export default class FormExample extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      errorText: '',
      submitted: false,
      formData: null,
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
    const initialData = {

    };

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
          submitButton="Submit"
          className="custom-forms-class"
          store={storeName}
          initialState={initialData}
          errorText={this.state.errorText}
          onSubmit={this.handleSubmit}
          spinner={<Spinner />}
          submittingText='Vent litt'
        >
          <Input
            {...inputClasses}
            store={storeName}
            label="Text field"
            name="name"
          />
          <Input
            {...inputClasses}
            dependOn="name"
            dependencyFunc={this.getUppercaseName}
            store={storeName}
            label="Dependent text field"
            name="aggregatedName"
          />
          <Input
            required
            {...inputClasses}
            store={storeName}
            label="Required text field with e-mail validation"
            name="email"
            errorText="Wrong e-mail"
            validate="email"
          />
          <Input
            required
            store={storeName}
            label="Required text field"
            name="required"
            errorText="Error"
          />
          <RadioButtons
            {...inputClasses}
            required
            errorText="Oh no"
            store={storeName}
            label="Radio buttons"
            name="radio"
            options={radioOptions}
          />
          <Select
            {...inputClasses}
            store={storeName}
            label="Select"
            options={selectOptions}
            name="select"
          />
          <TextArea
            {...inputClasses}
            store={storeName}
            label="Text area"
            name="textarea"
          />
          <Input
            type="hidden"
            name="hiddenName"
            dependOn="name"
            dependencyFunc={this.getUppercaseName}
            store={storeName}
          />
        </Form>
        { this.state.formData ?
          <div>
            <h2>Form result</h2>
            <ul>
              { Object.keys(this.state.formData).map((field) => {
                return <li key={field}>{field} : {this.state.formData[field]}</li>;
              })}
            </ul>
          </div>
        : null }
      </div>
    );
  }
}
