import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, SubForm, } from 'nocms-forms';

export default class StepWithSubform extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errorText: null,
    };
  }

  handleSubmit(formData, cb) {
    cb();
    this.props.goNext(formData);
  }

  render() {
    return (
      <Form
        wizardStep
        key={this.props.store}
        onSubmit={this.handleSubmit}
        initialState={this.props.initialState}
        store={this.props.store}
        errorText={this.state.errorText}
        backButton={this.props.backButton}
        submitButtonText="Fullfør"
      >
        <h4>Step: {this.props.name}</h4>
        <SubForm name="address">
          <Field name="street" label="Street" />
          <Field name="city" label="City" />
          <Field name="zip" label="Zip code" />
          <SubForm name="costruction">
            <Field name="roof" label="Roof" />
            <Field name="windows" label="Windows" />
          </SubForm>
        </SubForm>
      </Form>
    );
  }
}

StepWithSubform.propTypes = {
  store: PropTypes.string,
  initialState: PropTypes.object,
  name: PropTypes.string,
  backButton: PropTypes.object,
  goNext: PropTypes.func,
};
