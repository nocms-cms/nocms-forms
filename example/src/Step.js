import React from 'react';
import { Input } from 'nocms-forms';

const Step = (props, context) => {
  return (
    <div>
      <h2>Step: {props.name}</h2>
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


Step.contextTypes = {
  store: React.PropTypes.string
};

module.exports = Step;
