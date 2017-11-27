import React from 'react';
import ReactDOM from 'react-dom';
import FormExample from './FormExample';
import WizardExample from './WizardExample';
import WizardExampleWithNamedSteps from './WizardExampleWithNamedSteps';
import WizardExampleWithCustomNavigation from './WizardExampleWithCustomNavigation';
import WizardExampleWithHiddenStepFields from './WizardExampleWithHiddenStepFields';
import DependenciesExample from './DependenciesExample';
import DateExample from './DateExample';
import NestedFormExample from './NestedFormExample';

const stores = require('nocms-stores');
const { triggerGlobal } = require('nocms-events');

const clearAllStores = () => {
  stores.clearAll();
  triggerGlobal('all-stores-cleared');
};

const App = () => (
  <div>
    <button onClick={clearAllStores}>Clear all stores</button>
    <FormExample />
    <hr />
    <WizardExample />
    <hr />
    <WizardExampleWithNamedSteps />
    <hr />
    <WizardExampleWithCustomNavigation />
    <hr />
    <WizardExampleWithHiddenStepFields />
    <hr />
    <DependenciesExample />
    <hr />
    <DateExample />
    <hr />
    <NestedFormExample />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
