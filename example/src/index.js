const React = require('react');
const ReactDOM = require('react-dom');
const FormExample = require('./FormExample');
const WizardExample = require('./WizardExample');

class App extends React.Component {
  render() {
    return (
      <div>
        <FormExample />
        <hr />
        <WizardExample />
      </div>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
