import React from 'react';
import PropTypes from 'prop-types';

const sourceCodeUrls = {
  basicExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/BasicExample.js',
  formExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/FormExample.js',
  wizardExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/WizardExample.js',
  wizardExampleWithNamedSteps: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/WizardExampleWithNamedSteps.js',
  wizardExampleWithCustomNavigation: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/WizardExampleWithCustomNavigation.js',
  dependenciesExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/DependenciesExample.js',
  dateExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/DateExample.js',
  nestedFormExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/NestedFormExample.js',
  nestedFormInWizardExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/NestedFormInWizard.js',
  customFieldExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/CustomFieldExample.js',
};

const SourceCode = (props) => {
  return (
    <p>Find the source code for this example at <a href={sourceCodeUrls[props.name]}>{sourceCodeUrls[props.name]}</a></p>
  );
};

SourceCode.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SourceCode;
