import React from 'react';
import ReactDOM from 'react-dom';
import FormExample from './FormExample';
import WizardExample from './WizardExample';
import WizardExampleWithNamedSteps from './WizardExampleWithNamedSteps';
import WizardExampleWithCustomNavigation from './WizardExampleWithCustomNavigation';

const App = () => (
  <div>
    <FormExample />
    <hr />
    <WizardExample />
    <hr />
    <WizardExampleWithNamedSteps />
    <hr />
    <WizardExampleWithCustomNavigation />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
