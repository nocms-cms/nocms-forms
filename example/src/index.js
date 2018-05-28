import React from 'react';
import ReactDOM from 'react-dom';
import FormExample from './FormExample';
import BasicExample from './BasicExample';
import CustomFieldExample from './CustomFieldExample';
import WizardExample from './WizardExample';
import WizardExampleWithNamedSteps from './WizardExampleWithNamedSteps';
import WizardExampleWithCustomNavigation from './WizardExampleWithCustomNavigation';
import WizardExampleWithHiddenStepFields from './WizardExampleWithHiddenStepFields';
import NestedFormInWizardExample from './NestedFormInWizard';
import DependenciesExample from './DependenciesExample';
import DateExample from './DateExample';
import NestedFormExample from './NestedFormExample';
import ContextValidationExample from './ContextValidationExample';

const stores = require('nocms-stores');
const { triggerGlobal } = require('nocms-events');

const clearAllStores = () => {
  stores.clearAll();
  triggerGlobal('all-stores-cleared');
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      basicExample: true,
      formExample: false,
      wizardExample: false,
      wizardExampleWithNamedSteps: false,
      wizardExampleWithCustomNavigation: false,
      wizardExampleWithHiddenStepFields: false,
      dependenciesExample: false,
      dateExample: false,
      nestedFormExample: false,
      nestedFormInWizardExample: false,
      customField: false,
      contextValidation: false,
    };
    this.toggleExample = this.toggleExample.bind(this);
  }

  toggleExample(example) {
    return () => {
      const newState = {};
      newState[example] = !this.state[example];
      this.setState(newState);
    };
  }

  render() {
    return (
      <div>
        <p>Toggle the different examples using the buttons</p>
        <div>
          <button style={{ border: this.state.basicExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('basicExample')}>Basic example</button>
          <button style={{ border: this.state.formExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('formExample')}>Form example</button>
          <button style={{ border: this.state.wizardExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('wizardExample')}>Wizard example</button>
          <button style={{ border: this.state.wizardExampleWithNamedSteps ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('wizardExampleWithNamedSteps')}>Wizard example with named steps</button>
          <button style={{ border: this.state.wizardExampleWithCustomNavigation ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('wizardExampleWithCustomNavigation')}>Wizard example with custom navigation</button>
          <button style={{ border: this.state.dependenciesExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('dependenciesExample')}>Example with dependencies</button>
          <button style={{ border: this.state.dateExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('dateExample')}>Date example</button>
          <button style={{ border: this.state.nestedFormExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('nestedFormExample')}>Nested fields example</button>
          <button style={{ border: this.state.nestedFormInWizardExample ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('nestedFormInWizardExample')}>Nested fields in wizard</button>
          <button style={{ border: this.state.customField ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('customField')}>Custom field</button>
          <button style={{ border: this.state.contextValidation ? '2px solid black' : '1px solid gray' }} onClick={this.toggleExample('contextValidation')}>Context validation</button>
        </div>
        <hr />
        { this.state.basicExample ? <BasicExample /> : null }
        { this.state.formExample ? <FormExample /> : null }
        { this.state.wizardExample ? <WizardExample /> : null }
        { this.state.wizardExampleWithNamedSteps ? <WizardExampleWithNamedSteps /> : null }
        { this.state.wizardExampleWithCustomNavigation ? <WizardExampleWithCustomNavigation /> : null }
        { this.state.wizardExampleWithHiddenStepFields ? <WizardExampleWithHiddenStepFields /> : null }
        { this.state.dependenciesExample ? <DependenciesExample /> : null }
        { this.state.dateExample ? <DateExample /> : null }
        { this.state.nestedFormExample ? <NestedFormExample /> : null }
        { this.state.nestedFormInWizardExample ? <NestedFormInWizardExample /> : null }
        { this.state.customField ? <CustomFieldExample /> : null }
        { this.state.contextValidation ? <ContextValidationExample /> : null }
        <hr />
        <p>This button will clear all stores, deleting all form data in every form. See how each form is behaving when data is cleared.</p>
        <button onClick={clearAllStores}>Clear all stores</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

