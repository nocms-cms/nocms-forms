import React from 'react';
import ReactDOM from 'react-dom';
import FormExample from './FormExample';
import WizardExample from './WizardExample';

const App = () => (
  <div>
    <FormExample />
    <hr />
    <WizardExample />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
