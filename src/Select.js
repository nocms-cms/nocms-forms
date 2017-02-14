const React = require('react');
const stores = require('nocms-stores');
const utils = require('nocms-utils');
const Validator = require('nocms-validation');

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
        validate: this.validate,
      };
      stores.update(this.props.store, state);
      return isValid;
    }
    return true;
  }
  render() {
    const containerClasses = `${this.props.controlGroupClass} form__control-group ${!this.state.isValid ? ` form__error ${this.props.errorWrapperClass || ''}` : ''} `;
    const emptyOption = this.props.emptyLabel ? [<option key="empty" value="">{this.props.emptyLabel}</option>] : [];
    const options = emptyOption.concat(this.props.options.map((o, index) => {
      let option = o;
      if (typeof option === 'string') {
        option = { label: option, value: option };
      }
      return <option key={index} value={option.value}>{option.label}</option>;
    }));

    return (
      <div className={containerClasses}>
        <label><span className={`${this.props.labelClass} form__label`}>{this.props.label}</span>
          <select
            name={this.props.name}
            value={this.state.value}
            aria-invalid={!this.state.isValid}
            aria-required={this.props.required}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterKey}
            onBlur={this.handleBlur}
          >
            {options}
          </select>
          {this.props.errorText && !this.state.isValid ?
            <div className={`${this.props.errorTextClass} form__error-text`}>{this.props.errorText}</div>
          : null}
        </label>
      </div>
    );
  }
}

Select.propTypes = {
  value: React.PropTypes.string,
  errorTextClass: React.PropTypes.string,
  errorWrapperClass: React.PropTypes.string,
  labelClass: React.PropTypes.string,
  controlGroupClass: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  emptyLabel: React.PropTypes.string,
  store: React.PropTypes.string,
  options: React.PropTypes.array,
  errorText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  validate: React.PropTypes.string,
  label: React.PropTypes.string,
};

Select.defaultProps = {
  value: '',
  errorWrapperClass: '',
  errorTextClass: '',
  labelClass: '',
  controlGroupClass: '',
};
