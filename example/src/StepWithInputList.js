import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, InputListItem, InputList } from 'nocms-forms';

export default class StepWithNesting extends Component {
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
        <InputList
          name="hobbies"
          of={
            <InputListItem>
              <Field name="name" label="Hobby name" />
              <Field name="description" label="Hobby description" />
            </InputListItem>
          }
        />
      </Form>
    );
  }
}

StepWithNesting.propTypes = {
  store: PropTypes.string,
  initialState: PropTypes.object,
  name: PropTypes.string,
  backButton: PropTypes.object,
  goNext: PropTypes.func,
};
