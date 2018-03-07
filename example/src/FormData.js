import React from 'react';
import PropTypes from 'prop-types';

const FormData = (props) => {
  if (!props.formData) {
    return null;
  }
  return (
    <div>
      <h3>The onSubmit function received the following formData:</h3>
      <pre>
        {JSON.stringify(props.formData, null, '  ')}
      </pre>
    </div>
  );
};

FormData.propTypes = {
  formData: PropTypes.object,
};

export default FormData;
