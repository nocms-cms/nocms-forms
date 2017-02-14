const React = require('react');
const stores = require('nocms-stores');
const utils = require('nocms-utils');
const Validator = require('nocms-validation');

export default class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
      validate: this.validate,
    };
  }

  componentWillMount() {
    if (utils.isBrowser()) {
      stores.subscribe(this.props.store, this.handleStoreChange);
      const store = stores.getStore(this.props.store);
      const initialState = store[this.props.name];
      let inputState = {};
      inputState[this.props.name] = { isValid: true, isValidated: !this.props.required, validate: this.validate };

      if (typeof initialState === 'undefined') {
        inputState[this.props.name].value = this.props.value;
      } else if (typeof initialState !== 'object') {
        inputState[this.props.name].value = initialState;
      } else {
        inputState = initialState;
      }
      stores.update(this.props.store, inputState);
    }
  }

  componentWillUnmount() {
    if (utils.isBrowser()) {
      stores.unsubscribe(this.props.store, this.handleStoreChange);
    }
  }

  handleStoreChange(store) {
    this.setState(store[this.props.name]);
  }

  handleChange(e) {
    const state = {};
    state[this.props.name] = {
      value: e.currentTarget.value,
      isValid: true,
      isValidated: this.state.isValidated,
      validate: this.validate,
    };
    stores.update(this.props.store, state);
    if (this.props.onChange) {
      this.props.onChange(e, e.currentTarget.value);
    }
  }
  handleEnterKey(e) {
    if (e.keyCode === 13) { // Enter
      this.validate();
    }
  }
  validate() {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      const state = {};
      state[this.props.name] = {
        value: this.state.value,
        isValid,
        isValidated: true,
        validate: this.validate,
      };
      stores.update(this.props.store, state);
      return isValid;
    }
    return true;
  }
  render() {
    const containerClasses = `${this.props.controlGroupClass} form__control-group form__control-group--radio ${this.state.isValid && this.state.isValidated ? `form__success ${this.props.successWrapperClass} ` : ''} ${!this.state.isValid ? ` form__error ${this.props.errorWrapperClass || ''}` : ''}`;
    const isRequiredLabelClass = this.props.required ? 'form__label-required' : null;
    const radios = this.props.options.map((o, index) => {
      let option = o;
      if (typeof option === 'string') {
        option = { label: option, value: option };
      }
      return (
        <label key={`${this.props.name}_${index}`} className={`${this.props.labelClass} ${option.disabled ? ' disabled' : null}`}>
          <input
            checked={this.state.value === option.value}
            type="radio"
            value={option.value}
            name={this.props.name}
            disabled={option.disabled}
            onChange={this.handleChange}
            onClick={this.handleChange}
            onKeyDown={this.handleEnterKey}
          />
          <span className="form__radio-label">{option.label}</span>
        </label>);
    });
    return (
      <div className={containerClasses}>
        <fieldset>
          <legend>
            {this.props.label}
            {this.props.required ? <span className={isRequiredLabelClass}>{this.props.requiredMark}</span> : null}
          </legend>
          {radios}
          {this.props.errorText && !this.state.isValid ?
            <div className={`${this.props.errorTextClass} form__error-text`}>{this.props.errorText}</div>
          : null}
        </fieldset>
      </div>
    );
  }
}

RadioButtons.propTypes = {
  name: React.PropTypes.string.isRequired,
  successWrapperClass: React.PropTypes.string,
  errorTextClass: React.PropTypes.string,
  errorWrapperClass: React.PropTypes.string,
  labelClass: React.PropTypes.string,
  controlGroupClass: React.PropTypes.string,
  value: React.PropTypes.string,
  errorText: React.PropTypes.string,
  store: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  validate: React.PropTypes.string,
  options: React.PropTypes.array,
  label: React.PropTypes.string,
  requiredMark: React.PropTypes.string,
};

RadioButtons.defaultProps = {
  required: false,
  requiredMark: '*',
  errorTextClass: '',
  successWrapperClass: '',
  errorWrapperClass: '',
  labelClass: '',
  controlGroupClass: '',
};
