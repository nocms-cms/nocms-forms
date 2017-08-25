import React from 'react';
import ReactDOM from 'react-dom';
import FormExample from './FormExample';
import WizardExample from './WizardExample';
import WizardExampleWithNamedSteps from './WizardExampleWithNamedSteps';

const App = () => (
  <div>
    <FormExample />
    <hr />
    <WizardExample />
    <hr />
    <WizardExampleWithNamedSteps />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
