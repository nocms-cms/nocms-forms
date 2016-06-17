import React, { Component } from 'react';
import lang from '../../i18n';
import Validator from './validator';

export default class Input extends Component {
  constructor (props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      value: props.value || '',
      isValid: true,
      isValidated: false,
      convertDate: props.type === 'date'
    };
  }
  handleStoreChange (store) {
    let newState = store[this.props.name];
    if (typeof newState !== 'object') {
      // Upgrade simple data values to input state in store
      newState = {
        value: newState,
        isValid: true,
        isValidated: false
      };
    }
    this.setState(newState);
  }
  componentWillMount () {
    if (global.environment !== 'server') {
      global.NoCMS.subscribe(this.props.store, this.handleStoreChange);
      const store = global.NoCMS.getStore(this.props.store);
      const initialState = store[this.props.name];
      let inputState = {};
      inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate };

      if (typeof initialState === 'undefined' || initialState === null) {
        inputState[this.props.name].value = this.props.value || '';
      } else if (typeof initialState !== 'object') {
        inputState[this.props.name].value = initialState;
      } else {
        inputState = initialState;
      }

      global.NoCMS.updateStore(this.props.store, inputState);
    }
  }
  componentWillUnmount () {
    if (global.environment !== 'server') {
      global.NoCMS.unsubscribe(this.props.store, this.handleStoreChange);
      if (this.props.deleteOnUnmount) {
        const inputState = {};
        inputState[this.props.name] = undefined;
        global.NoCMS.updateStore(this.props.store, inputState);
      }
    }
  }
  handleChange (e) {
    const data = {};
    const value = this.props.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;

    data[this.props.name] = { value: value, isValid: true };
    const state = {};
    state[this.props.name] = {
      value: value,
      isValid: true,
      isValidated: this.state.isValidated,
      validate: this.validate,
      convertDate: this.props.type === 'date'
    };

    global.NoCMS.updateStore(this.props.store, state);
  }
  handleEnterKey (e) {
    if (e.keyCode === 13) { // Enter
      this.validate();
    }
  }

  handleBlur (e) {
    e.stopPropagation();
    this.validate();
  }

  validate () {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      const state = {};
      state[this.props.name] = {
        value: this.state.value,
        isValid: isValid,
        isValidated: true,
        convertDate: this.props.type === 'date'
      };
      global.NoCMS.updateStore(this.props.store, state);
      return isValid;
    }
    return true;
  }

  render () {
    const type = this.props.type || 'text';
    const classes = this.state.isValid ? '' : 'error';
    const containerClasses = 'pure-control-group' + (!this.state.isValid ? ' error' : '') + (this.props.inlineLabel ? ' inline-label' : '');
    const isRequiredLabelClass = this.props.required ? 'label-required' : '';
    const texts = lang(this.props.lang).texts;
    return (
      <div className={containerClasses}>
        {this.props.inlineLabel && this.props.errorText && !this.state.isValid ?
          <div className="error-text">{this.props.errorText}</div>
        : null }
        <label id={this.props.labelId}>{this.props.label} {this.props.required ? <span className={isRequiredLabelClass}>{texts.inputRequired}</span> : null}
          <input className={classes}
                 type={type}
                 autoComplete="off"
                 maxLength={this.props.maxLength}
                 name={this.props.name}
                 value={this.state.value}
                 disabled={this.props.disabled}
                 placeholder={this.props.placeholder ? this.props.placeholder : ''}
                 aria-invalid={!this.state.isValid}
                 aria-required={this.props.required}
                 onChange={this.handleChange.bind(this)}
                 onClick={this.props.type === 'checkbox' ? this.handleChange.bind(this) : null}
                 onKeyDown={this.handleEnterKey.bind(this)}
                 onBlur={this.handleBlur.bind(this)} />

         {!this.props.inlineLabel && this.props.errorText && !this.state.isValid ?
           <div className="error-text">{this.props.errorText}</div>
         : null}
        </label>
      </div>
    );
  }
}
