const React = require('react');
const stores = require('nocms-stores');
const Validator = require('nocms-validation');

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: props.value,
      isValid: true,
      isValidated: false,
    };
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    if (global.environment !== 'server') {
      stores.subscribe(this.props.store, this.handleStoreChange);
      const initialState = {};
      initialState[this.props.name] = {
        value: this.props.value,
        isValid: true,
        isValidated: !this.props.required,
        validate: this.validate,
      };
      stores.update(this.props.store, initialState);
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
    const data = {};
    data[this.props.name] = { value: e.currentTarget.value, isValid: true };
    const state = {};
    state[this.props.name] = {
      value: e.currentTarget.value,
      isValid: true,
      isValidated: this.state.isValidated,
      validate: this.validate,
    };
    stores.update(this.props.store, state);
  }
  validate() {
    if (this.props.validate || this.props.required) {
      const isValid = Validator.validate(this.state.value, this.props.validate, this.props.required);
      const state = {};
      state[this.props.name] = {
        value: this.state.value,
        isValid,
        isValidated: true,
      };
      stores.update(this.props.store, state);
      return isValid;
    }
    return true;
  }
  render() {
    const containerClasses = 'pure-control-group' + (!this.state.isValid ? ' error' : '') + (this.props.customClasses ? ' ' + this.props.customClasses : '');
    const isRequiredLabelClass = this.props.required ? 'label-required' : '';
    return (
      <div className={containerClasses}>
        <label id={this.props.labelId}>{this.props.label} {this.props.required ? <span className={isRequiredLabelClass}>{this.props.requiredMark}</span> : null}
          <textarea
            name={this.props.name}
            aria-invalid={!this.state.isValid}
            aria-required={this.props.required}
            onChange={this.handleChange}
            onBlur={this.validate}
            maxLength={this.props.maxLength ? this.props.maxLength : ''}
            value={this.state.value}
          />

         {this.props.errorText && !this.state.isValid ?
           <div className="error-text">{this.props.errorText}</div>
         : null}
        </label>
      </div>
    );
  }
}

TextArea.propTypes = {
  validate: React.PropTypes.string,
  required: React.PropTypes.bool,
  store: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  errorText: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  customClasses: React.PropTypes.string,
  labelId: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  requiredMark: React.PropTypes.string,
};

TextArea.defaultProps = {
  requiredMark: '*',
};
