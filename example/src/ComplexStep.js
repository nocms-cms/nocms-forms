import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';
import stores from 'nocms-stores';
import utils from 'nocms-utils';

export default class ComplexStep extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.depFunc = this.depFunc.bind(this);

    this.state = {
      errorText: null,
    };
  }

  componentWillUnmount() {
    if (utils.isBrowser()) {
      stores.unsubscribe(this.props.store, this.handleStoreChange);
    }
  }

  depFunc(changes, value) {
    if (changes.selector.value === 'yes') {
      return false;
    }
    return true;
  }

  handleSubmit(formData, cb) {
    cb();
    this.props.goNext(formData);
  }

  render(){
    const radioOptions = [
      {
        label: 'Yes',
        value: 'yes'
      },
      {
        label: 'Np',
        value: 'no',
      }
    ];
    return (
      <Form
        wizardStep
        key={this.props.store}
        onSubmit={this.handleSubmit}
        initialState={this.props.initialState}
        className={this.props.formClass}
        store={this.props.store}
        errorText={this.state.errorText}
        backButton={this.props.backButton}
      >
        <Field
          type="radio"
          label="Chose one"
          name="selector"
          options={radioOptions}
          onChange={this.onClick}
          required
        />
        <Field
          type="text"
          dependOn="selector"
          deleteOnDependencyChange={this.depFunc}
          name="dependent"
          label="I'm dependent"
        />
      </Form>
    );
  }
}
