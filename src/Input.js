import React, { Component } from 'react';
const stores = require('nocms-stores');
import Validator from 'nocms-validation';

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      value: props.value || '',
      isValid: true,
      isValidated: false,
      convertDate: props.type === 'date',
    };
  }

  componentWillMount() {
    if (global.environment !== 'server') {
      stores.subscribe(this.props.store, this.handleStoreChange);
      const store = stores.getStore(this.props.store);
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

      stores.update(this.props.store, inputState);
    }
  }
  componentWillUnmount() {
    if (global.environment !== 'server') {
      stores.unsubscribe(this.props.store, this.handleStoreChange);
      if (this.props.deleteOnUnmount) {
        const inputState = {};
        inputState[this.props.name] = undefined;
        stores.update(this.props.store, inputState);
      }
    }
  }

  handleStoreChange(store) {
    let newState = store[this.props.name];
    if (typeof newState !== 'object') {
      // Upgrade simple data values to input state in store
      newState = {
        value: newState,
        isValid: true,
        isValidated: false,
      };
    }
    this.setState(newState);
  }

  handleChange(e) {
    const data = {};
    const value = this.props.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value;

    data[this.props.name] = { value, isValid: true };
    const state = {};
    state[this.props.name] = {
      value,
      isValid: true,
      isValidated: this.state.isValidated,
      validate: this.validate,
      convertDate: this.props.type === 'date',
    };

    stores.update(this.props.store, state);
  }
  handleEnterKey(e) {
    if (e.keyCode === 13) { // Enter
      this.validate();
    }
  }

  handleBlur(e) {
    e.stopPropagation();
    this.validate();
  }

  validate() {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      const state = {};
      state[this.props.name] = {
        value: this.state.value,
        isValid,
        isValidated: true,
        convertDate: this.props.type === 'date',
      };
      stores.update(this.props.store, state);
      return isValid;
    }
    return true;
  }

  render() {
    const type = this.props.type || 'text';
    const classes = this.state.isValid ? '' : 'form__error';
    const containerClasses = 'form__control-group' + (!this.state.isValid ? ' form__error' : '') + (this.props.inlineLabel ? ' inline-label' : '');
    const isRequiredLabelClass = this.props.required ? 'form__label-required' : '';
    return (
      <div className={containerClasses}>
        {this.props.inlineLabel && this.props.errorText && !this.state.isValid ?
          <div className="form__error-text">{this.props.errorText}</div>
        : null}
        <label id={this.props.labelId}><span className="form__label">{this.props.label}</span> {this.props.required ? <span className={isRequiredLabelClass}>{this.props.requiredMark}</span> : null}
          <input
            className={classes}
            type={type}
            autoComplete="off"
            maxLength={this.props.maxLength}
            name={this.props.name}
            value={this.state.value}
            disabled={this.props.disabled}
            placeholder={this.props.placeholder ? this.props.placeholder : ''}
            aria-invalid={!this.state.isValid}
            aria-required={this.props.required}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onClick={this.props.type === 'checkbox' ? this.handleChange : null}
            onKeyDown={this.handleEnterKey}
            onBlur={this.handleBlur}
          />

         {!this.props.inlineLabel && this.props.errorText && !this.state.isValid ?
           <div className="form__error-text">{this.props.errorText}</div>
         : null}
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  value: React.PropTypes.string,
  type: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  store: React.PropTypes.string.isRequired,
  required: React.PropTypes.bool,
  deleteOnUnmount: React.PropTypes.bool,
  validate: React.PropTypes.string,
  inlineLabel: React.PropTypes.bool,
  errorText: React.PropTypes.string,
  label: React.PropTypes.string,
  requiredMark: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  labelId: React.PropTypes.string,
};


Input.defaultProps = {
  requiredMark: '*',
  type: 'text',
  required: false,
  disabled: false,
};

export default Input;
