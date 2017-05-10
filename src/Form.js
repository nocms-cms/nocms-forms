import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';
import events from 'nocms-events';

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

class Form extends Component {
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

  getChildContext() {
    return {
      store: this.props.store,
    };
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

    if (this.state.store) {
      Object.keys(this.state.store).forEach((field) => {
        const prop = this.state.store[field];
        if (prop === null || typeof prop === 'undefined') {
          return;
        }
        if (prop.disabled) {
          return;
        }
        if (typeof prop !== 'object' || prop instanceof Array) {
          formData[field] = prop;
          return;
        }
        if (!prop.isValidated) {
          isValid = prop.validate();
        }
        if (prop.isValidated) {
          isValid = isValid && prop.isValid;
        }
        if (isValid) {
          formData[field] = prop.convertDate ? convertDate(prop.value) : prop.value;
        }
      });
    }

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
      const target = this.formEl.querySelector('.error-node');
      if (target) {
        const targetPos = target.offsetTop;
        const input = target.querySelector('select, textarea, radio, input');
        if (!input) {
          return;
        }
        utils.scrollTo(document.body, targetPos - 160, this.props.scrollDuration, () => {
          input.focus();
        });
      }
    }, 0);
  }

  render() {
    const {
      submitButtonText,
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
    let buttons = null;
    const buttonContainerClassName = centerSubmitButton ? 'form__button-container form__button-container--center' : 'form__button-container';
    if (!noSubmitButton) {
      const buttonText = this.state.isSubmitting ? submitInProgress : submitButtonText || SUBMIT_BUTTON_DEFAULT;
      buttons = (<div className={buttonContainerClassName}>
        {this.props.backButton}
        <button disabled={this.state.isDisabled} type="submit" className={submitButtonClassName || 'button button__primary'}>{buttonText}</button>
      </div>);
    }
    return (
      <form
        ref={node => this.setFormEl(node)}
        onSubmit={this.handleSubmit}
        className={className}
        noValidate
      >
        {this.state.errorText ?
          <div className="form__error form__error-summary visible">{this.state.errorText}</div>
        : null}
        {this.props.children}
        {utils.isBrowser() ?
          buttons
        : spinner }
      </form>
    );
  }
}

Form.propTypes = {
  initialState: PropTypes.object,
  store: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
  submitButtonClassName: PropTypes.string,
  noSubmitButton: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  centerSubmitButton: PropTypes.bool,
  spinner: PropTypes.object,
  backButton: PropTypes.object,
  submittingText: PropTypes.string,
  wizardStep: PropTypes.bool,
  scrollDuration: PropTypes.number,
};

Form.defaultProps = {
  centerSubmitButton: true,
  className: 'form',
  scrollDuration: 400,
};

Form.childContextTypes = {
  store: PropTypes.string,
};

export default Form;
