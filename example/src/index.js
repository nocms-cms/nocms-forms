import React from 'react';
import ReactDOM from 'react-dom';
import FormExample from './FormExample';
import WizardExample from './WizardExample';
import WizardExampleWithNamedSteps from './WizardExampleWithNamedSteps';
import WizardExampleWithCustomNavigation from './WizardExampleWithCustomNavigation';
import WizardExampleWithHiddenStepFields from './WizardExampleWithHiddenStepFields';

const stores = require('nocms-stores');
const events = require('nocms-events');

const clearAllStores = () => {
  stores.clearAll();
  events.trigger('all-stores-cleared');
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
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
