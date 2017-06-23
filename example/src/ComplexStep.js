import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';
import stores from 'nocms-stores';
import utils from 'nocms-utils';

export default class ComplexStep extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.depFunc = this.depFunc.bind(this);

    this.onClick = this.onClick.bind(this);
    if (utils.isBrowser()) {
      stores.subscribe(props.store, this.handleStoreChange);
    }
    this.state = {
      errorText: null,
      radio: null,
    };
  }

  componentDidMount() {
    if (utils.isBrowser) {
      const store = stores.getStore(this.props.store);
      const initialState = store['complexText'];
    }
  }

  depFunc(changes, value) {
    if (changes.selector.value === 'yes') {
      return false;
    }
    return true;
  }

  handleSubmit(formData, cb){
    cb();
    this.props.goNext(formData);
  }

  handleStoreChange(store) {
    console.log('change');
  }

  onClick(event) {
    this.setState({ radio: event.currentTarget.value });
  }

  render(){
    const radioOptions = [
      {
        label: 'Ja',
        value: 'yes'
      },
      {
        label: 'Nei',
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
          label="Velg ja eller nei"
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
          label="Jeg er avhengig"
        />
      </Form>
    );
  }
}
