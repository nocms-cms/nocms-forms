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
    const { name, value, required } = this.props;
    if (utils.isBrowser()) {
      stores.subscribe(this.context.store, this.handleStoreChange);
      const storeObj = stores.getStore(this.context.store);
      const initialState = storeObj[name];
      let inputState = {};
      inputState[name] = { isValid: true, isValidated: !required, validate: this.validate };
      if (typeof initialState === 'undefined') {
        inputState[name].value = value;
      } else if (typeof initialState !== 'object') {
        inputState[name].value = initialState;
      } else {
        inputState = initialState;
      }
      stores.update(this.context.store, inputState);
    }
  }

  componentWillUnmount() {
    if (utils.isBrowser()) {
      stores.unsubscribe(this.context.store, this.handleStoreChange);
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
    stores.update(this.context.store, state);
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
      stores.update(this.context.store, state);
      return isValid;
    }
    return true;
  }

  render() {
    const {
      controlGroupClass,
      successWrapperClass,
      errorText,
      errorTextClass,
      errorWrapperClass,
      labelClass,
      label,
      name,
      options,
      required,
      requiredClass,
      requiredMark,
      emptyLabel,
    } = this.props;

    let containerClasses = controlGroupClass;
    if (this.state.isValid && this.state.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.state.isValid) {
      containerClasses += ` ${errorWrapperClass}`;
    }

    const emptyOption = emptyLabel ? [<option key="empty" value="">{emptyLabel}</option>] : [];
    const optionsList = emptyOption.concat(options.map((o, index) => {
      let option = o;
      if (typeof option === 'string') {
        option = { label: option, value: option };
      }
      return <option key={index} value={option.value}>{option.label}</option>;
    }));

    return (
      <div className={containerClasses}>
        <label>
          <span className={labelClass}>
            {label}
            {required ? <span className={requiredClass}>{requiredMark}</span> : null}
          </span>
          <select
            name={name}
            value={this.state.value}
            aria-invalid={!this.state.isValid}
            aria-required={required}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterKey}
            onBlur={this.handleBlur}
          >
            {optionsList}
          </select>
          {errorText && !this.state.isValid ?
            <div className={errorTextClass}>{errorText}</div>
          : null}
        </label>
      </div>
    );
  }
}

Select.contextTypes = {
  store: React.PropTypes.string, // we get this from Form.js
};

Select.propTypes = {
  requiredMark: React.PropTypes.string,
  value: React.PropTypes.string,
  errorTextClass: React.PropTypes.string,
  errorWrapperClass: React.PropTypes.string,
  successWrapperClass: React.PropTypes.string,
  labelClass: React.PropTypes.string,
  controlGroupClass: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  emptyLabel: React.PropTypes.string,
  options: React.PropTypes.array,
  errorText: React.PropTypes.string,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  requiredClass: React.PropTypes.string,
  validate: React.PropTypes.string,
  label: React.PropTypes.string,
};

Select.defaultProps = {
  requiredMark: '*',
  value: '',
  errorWrapperClass: 'form__control-group--error',
  successWrapperClass: 'form__control-group--success',
  errorTextClass: 'form__error-text',
  labelClass: 'form__label',
  controlGroupClass: 'form__control-group',
};
