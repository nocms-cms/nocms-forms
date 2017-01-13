import React from 'react';
import { Input } from 'nocms-forms';

const One = (props) => {
  return (
    <div>
      <h2>Første steg</h2>
        <Input required
               store={props.store}
               label="Første"
               name="firsttext"
               errorText="Oisann"
               validate="notEmpty" />
    </div>
  );
}

module.exports = One;
