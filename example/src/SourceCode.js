import React from 'react';
import PropTypes from 'prop-types';

const sourceCodeUrls = {
  basicExample: 'https://github.com/miles-no/nocms-forms/blob/master/example/src/BasicExample.js',
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
