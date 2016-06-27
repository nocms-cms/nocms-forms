const React = require('react');
const stores = require('nocms-stores');
const Validator = require('./validator');

export default class Select extends React.Component {
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
    if (global.environment !== 'server') {
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
    if (global.environment !== 'server') {
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
    const containerClasses = 'pure-control-group' + (!this.state.isValid ? ' error' : '');
    const classes = this.state.isValid ? '' : 'error';

    const options = this.props.options.map((o, index) => {
      let option = o;
      if (typeof option === 'string') {
        option = { label: option, value: option };
      }
      return <option key={index} value={option.value}>{option.label}</option>;
    });

    return (
      <div className={containerClasses}>
        <label>{this.props.label}
          <select
            className={classes}
            name={this.props.name}
            value={this.state.value}
            aria-invalid={!this.state.isValid}
            aria-required={this.props.required}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterKey}
          >
            {options}
          </select>
          {this.props.errorText && !this.state.isValid ?
            <div className="error-text">{this.props.errorText}</div>
          : null}
        </label>
      </div>
    );
  }
}

Select.propTypes = {
  value: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
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

};
