import React, { PropTypes } from 'react';

const Hidden = (props) => {
  const {
    name,
    value,
  } = props;

  return <input type="hidden" value={value} name={name} />;
};

Hidden.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Hidden.defaultProps = {
  value: '',
};

export default Hidden;
