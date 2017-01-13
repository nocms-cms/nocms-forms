const React = require('react');
const ReactDOM = require('react-dom');
import { Form, Input, RadioButtons, Select, TextArea, Wizard } from 'nocms-forms';
const Spinner = require('./Spinner');
const One = require('./One');
const Two = require('./Two');

const storeName = 'test-form';
const wizardStoreName = 'test-form-wizard';

class App extends React.Component {
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

  goBack(wizardData, currentStep) {
    return currentStep -1;
  }

  goNext(wizardData, currentStep) {
    return currentStep +1;
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
      radio: 'one',
    };
    const steps = [
      <One store={`${wizardStoreName}-step-0`} />,
      <Two store={`${wizardStoreName}-step-1`} />
    ];
    return (
      <div>
       {this.state.submitted ?
         <div>
           <h2>Submitted form with following form data</h2>
           <div><b>Text field:</b>{this.state.formData.name}</div>
           <div><b>Required text field with e-mail validation:</b>{this.state.formData.email}</div>
           <div><b>Required text field:</b>{this.state.formData.required}</div>
           <div><b>Radio buttons:</b>{this.state.formData.radio}</div>
           <div><b>Select:</b>{this.state.formData.select}</div>
           <div><b>Text area:</b>{this.state.formData.textarea}</div>
           <button type="button" onClick={this.handleReset}>Reset</button>
         </div> :
         <Form
           submitButton="Submit"
           store={storeName}
           initialState={initialData}
           errorText={this.state.errorText}
           onSubmit={this.handleSubmit}
           spinner={<Spinner />}
           submittingText='Vent litt'
         >
           <Input
             store={storeName}
             label="Text field"
             name="name"
           />
           <Input
             dependOn="name"
             dependencyFunc={this.getUppercaseName}
             store={storeName}
             label="Dependent text field"
             name="aggregatedName"
           />
           <Input
             required
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
             store={storeName}
             label="Radio buttons"
             name="radio"
             options={radioOptions}
           />
           <Select
             store={storeName}
             label="Select"
             options={selectOptions}
             name="select"
           />
           <TextArea
             store={storeName}
             label="Text area"
             name="textarea"
           />
         </Form>}
         < hr />
         <h2>Wizard form example</h2>
         <div>
         <Wizard goNext={this.goNext} goBack={this.goBack} store={wizardStoreName} steps={steps} />
         </div>
      </div>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
