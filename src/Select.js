const React = require('react');

export default class Select extends React.Component {
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
    if (this.props.isValid && this.props.isValidated) {
      containerClasses += ` ${successWrapperClass}`;
    }
    if (!this.props.isValid) {
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
            value={this.props.value}
            aria-invalid={!this.props.isValid}
            aria-required={required}
            onChange={this.props.handleChange}
            onKeyDown={this.props.handleKeyDown}
            onBlur={this.props.handleChange}
          >
            {optionsList}
          </select>
          {errorText && !this.props.isValid ?
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
  isValid: React.PropTypes.bool,
  isValidated: React.PropTypes.bool,
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
  handleChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  requiredClass: React.PropTypes.string,
  handleKeyDown: React.PropTypes.func,
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
