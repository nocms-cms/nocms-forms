import React from 'react';
import { Input } from 'nocms-forms';

const One = (props, context) => {
  return (
    <div>
      <h2>Første steg</h2>
        <Input required
               store={context.store}
               label="Label"
               name={props.name}
               errorText="Oisann"
               validate="notEmpty"
             />
    </div>
  );
}


One.contextTypes = {
  store: React.PropTypes.string
};

module.exports = One;
