const React = require('react');
const ReactDOM = require('react-dom');
const stores = require('nocms-stores');
const utils = require('nocms-utils');
const events = require('nocms-events');
const Spinner = require('./Spinner');

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = props.initialState || {};
    this.state.isValid = false;
    this.state.isDisabled = false;
    this.state.isSubmitting = false;
    this.state.errorText = null;
    if (global.environment !== 'server') {
      stores.createStore(props.store, props.initialState, this.handleStoreChange);
    }
  }

  componentWillUnmount() {
    if (global.environment !== 'server') {
      stores.remove(this.props.store, this.handleStoreChange);
    }
  }

  handleStoreChange(store) {
    this.setState({ store });
  }

  handleFinishSubmit(errorText) {
    this.setState({ isSubmitting: false, isDisabled: false, errorText });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    let isValid = true;

    Object.keys(this.state.store).forEach((field) => {
      const prop = this.state.store[field];
      if (typeof props === null) {
        return;
      }
      if (typeof prop !== 'object') {
        formData[field] = prop;
        return;
      }
      if (!prop.isValidated) {
        isValid = isValid && prop.validate();
      }
      if (prop.isValidated) {
        isValid = isValid && prop.isValid;
      }
      if (isValid) {
        formData[field] = prop.convertDate ? this.convertDate(prop.value) : prop.value;
      }
    });

    this.setState({ isValid });

    if (!isValid) {
      this.scrollToError();
      return;
    }
    this.setState({ isSubmitting: true, isDisabled: true });
    events.trigger('form_sent', this.props.store);

    if (this.props.onSubmit) {
      this.props.onSubmit(formData, this.handleFinishSubmit.bind(this));
    }
  }

  scrollToError() {
    const domNode = ReactDOM.findDOMNode(this);
    setTimeout(() => {
      const target = domNode.querySelector('.error');
      if (target) {
        const targetPos = target.offsetTop;
        const input = target.querySelector('input');
        utils.scrollTo(document.body, targetPos - 160, 400, () => {
          input.focus();
        });
      }
    }, 0);
  }

  convertDate(date) {
    if (/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
      return date;
    }
    const dateMatch = date.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
    if (dateMatch) {
      return `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
    }
    return date;
  }

  render() {
    const classes = 'form';
    const buttonText = this.state.isSubmitting ? <Spinner visible light /> : this.props.submitButton || 'OK';
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes}
        noValidate
      >
        {this.state.errorText ?
          <div className="error error-summary visible">{this.state.errorText}</div>
        : null}
        {this.props.children}
        {global.environment !== 'server' ?
          <div className="button-container">
            <button disabled={this.state.isDisabled} type="submit" className="pure-button button-primary">{buttonText}</button>
          </div>
        : <Spinner visible />}
      </form>
    );
  }
}

Form.propTypes = {
  initialState: React.PropTypes.object,
  store: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func,
  submitButton: React.PropTypes.string,
  errorText: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Form;
