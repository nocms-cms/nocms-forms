import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stores from 'nocms-stores';
import utils from 'nocms-utils';
import { triggerGlobal } from 'nocms-events';
import uuid from 'uuid/v4';

const SUBMITTING_DEFAULT = '...';
const SUBMIT_BUTTON_DEFAULT = 'OK';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      initialState: Object.assign({}, props.initialState),
      isValid: false,
      isDisabled: false,
      isSubmitting: false,
      errorText: null,
    };

    this.createStore = this.createStore.bind(this);
    if (utils.isBrowser()) {
      this.createStore(this.props.store, this.state.initialState);
    }
  }

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  componentWillMount() {

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

  createStore(name, initialState, doNotListen) {
    const is = {};
    Object.keys(initialState).forEach((key) => {
      const field = initialState[key];

      if (typeof field !== 'object') {
        is[key] = field;
      }
      if (typeof field === 'object') {
        if (field instanceof Array) {
          const idMap = [];
          field.forEach((item, idx) => {
            const id = uuid();
            this.createStore(`${name}-${key}-${id}`, item, true);
            idMap[idx] = id;
          });
          is[key] = { length: field.length, idMap };
        } else {
          this.createStore(`${name}-${key}`, field, true);
        }
      }
    });
    if (doNotListen) {
      stores.createStore(name, is);
      return;
    }
    stores.createStore(name, is, this.handleStoreChange);
  }

  handleStoreChange(store) {
    this.setState({ store });
  }

  handleFinishSubmit(errorText) {
    this.setState({ isSubmitting: false, isDisabled: false, errorText });
  }

  handleSubmit(e) {
    const { wizardStep } = this.props;
    e.preventDefault();
    const formData = {};
    let formIsValid = true;

    if (this.state.store) {
      Object.keys(this.state.store).forEach((field) => {
        const prop = this.state.store[field];
        if (prop === null) {
          return;
        }
        if (typeof prop === 'undefined') {
          if (wizardStep) {
            formData[field] = null;
          }
          return;
        }
        if (prop.hidden || prop.disabled) {
          return;
        }
        if (typeof prop !== 'object' || prop instanceof Array) {
          formData[field] = prop;
          return;
        }
        let thisOneIsValid = false;
        if (!prop.isValidated) {
          thisOneIsValid = prop.validate();
        }
        if (prop.isValidated) {
          thisOneIsValid = prop.isValid;
        }
        if (formIsValid) {
          if (prop.getValue) {
            formData[field] = prop.getValue();
          } else {
            formData[field] = prop.value;
          }
        }

        formIsValid = formIsValid && thisOneIsValid;
      });
    }

    this.setState({ isValid: formIsValid });

    if (!formIsValid) {
      this.scrollToError();
      return;
    }
    this.setState({ isSubmitting: true, isDisabled: true });
    triggerGlobal('form_sent', this.props.store);

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
        ref={(node) => { return this.setFormEl(node); }}
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
