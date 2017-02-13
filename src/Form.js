const React = require('react');
const stores = require('nocms-stores');
const utils = require('nocms-utils');
const events = require('nocms-events');

const SUBMITTING_DEFAULT = '...';
const SUBMIT_BUTTON_DEFAULT = 'OK';

const convertDate = (date) => {
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date;
  }
  const dateMatch = date.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if (dateMatch) {
    return `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
  }
  return date;
};

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
    if (utils.isBrowser()) {
      stores.createStore(props.store, props.initialState, this.handleStoreChange);
    }
  }

  componentWillUnmount() {
    if (utils.isBrowser()) {
      if (this.props.wizardStep) {
        stores.unsubscribe(this.props.store, this.handleStoreChange);
        return;
      }
      stores.remove(this.props.store, this.handleStoreChange);
    }
  }

  setFormEl(formEl) {
    this.formEl = formEl;
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
      const skipFields = ['isValid', 'isValidated', 'value', 'convertDate', 'isSubmitting', 'isDisabled'];
      if (prop === null || skipFields.indexOf(field) >= 0) {
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
        formData[field] = prop.convertDate ? convertDate(prop.value) : prop.value;
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
    setTimeout(() => {
      const target = this.formEl.querySelector('.form__error');
      if (target) {
        const targetPos = target.offsetTop;
        const input = target.querySelector('input');
        if (!input) {
          return;
        }
        utils.scrollTo(document.body, targetPos - 160, 400, () => {
          input.focus();
        });
      }
    }, 0);
  }

  render() {
    const {
      submitButton,
      submitButtonClassName,
      spinner,
      submittingText,
      className,
      centerSubmitButton,
      noSubmitButton,
    } = this.props;
    let submitInProgress;
    if (spinner) {
      submitInProgress = spinner;
    } else if (submittingText) {
      submitInProgress = submittingText;
    } else {
      submitInProgress = SUBMITTING_DEFAULT;
    }
    let submit = null;
    const buttonContainerClassName = centerSubmitButton ? 'form__button-container form__button-container--center' : 'form__button-container';
    if (!noSubmitButton) {
      const buttonText = this.state.isSubmitting ? submitInProgress : submitButton || SUBMIT_BUTTON_DEFAULT;
      submit = (<div className={buttonContainerClassName}>
        <button disabled={this.state.isDisabled} type="submit" className={submitButtonClassName || 'button button__primary'}>{buttonText}</button>
      </div>);
    }
    const formClassName = `${className} form`.trim();
    return (
      <form
        ref={node => this.setFormEl(node)}
        onSubmit={this.handleSubmit}
        className={formClassName}
        noValidate
      >
        {this.state.errorText ?
          <div className="form__error form__error-summary visible">{this.state.errorText}</div>
        : null}
        {this.props.children}
        {utils.isBrowser() ?
          submit
        : spinner }
      </form>
    );
  }
}

Form.propTypes = {
  initialState: React.PropTypes.object,
  store: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func,
  submitButton: React.PropTypes.string,
  submitButtonClassName: React.PropTypes.string,
  noSubmitButton: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  centerSubmitButton: React.PropTypes.bool,
  spinner: React.PropTypes.object,
  submittingText: React.PropTypes.string,
  wizardStep: React.PropTypes.bool,
};

Form.defaultProps = {
  centerSubmitButton: true,
};

export default Form;
