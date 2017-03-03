import React, { Component } from 'react';
import { Form, Field } from 'nocms-forms';
import stores from 'nocms-stores';
import utils from 'nocms-utils';

export default class ComplexStep extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    if (utils.isBrowser()) {
      stores.subscribe(props.store, this.handleStoreChange);
    }
    this.state = {
      errorText: null,
    };
  }

  componentDidMount() {
    if (utils.isBrowser) {
      const store = stores.getStore(this.props.store);
      const initialState = store['complexText'];
    }
  }

  handleSubmit(formData, cb){
    cb();
    this.props.goNext(formData);
  }

  handleStoreChange(store) {
    console.log('change');
  }

  render(){
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
        <Field required
           label="Noe vanvittig komplekst"
           name="complexText"
           errorText="Oisann"
           validate="notEmpty"
         />
      </Form>
    );
  }
}
