import React, { Component, PropTypes } from 'react';
import Form from './Form';

export default class WizardStep extends Component {
  constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
  handleSubmit() {
    this.props.goNext();
  }

  handleGoBack(e) {
    e.preventDefault();
    this.props.goBack();
  }

  render() {
    const {
      className,
      store,
      stepState,
      errorText,
      spinner,
    } = this.props;
    const formClassName = className ? `${className} form` : 'form';
    return (
      <Form
        wizardStep key={store}
        onSubmit={this.handleSubmit}
        initialState={stepState}
        className={formClassName}
        store={store}
        errorText={errorText}
        noSubmitButton
      >
        {this.props.children}
        { global.environment !== 'server' ?
          <div className="button-container">
            {this.props.showBackButton ? <button onClick={this.handleGoBack} className="pure-button button-secondary">Tilbake</button> : null}
            {this.props.showNextButton ? <button type="submit" className="pure-button button-primary">Neste</button> : null}
          </div>
        : spinner }
      </Form>
    );
  }
}

WizardStep.propTypes = {
  goBack: PropTypes.func,
  goNext: PropTypes.func,
  className: PropTypes.string,
  store: PropTypes.object,
  stepState: PropTypes.object,
  errorText: PropTypes.string,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  children: React.PropTypes.node,
  spinner: React.PropTypes.object,

};
