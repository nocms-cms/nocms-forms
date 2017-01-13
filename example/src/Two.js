import React from 'react';
import { Input } from 'nocms-forms';


const Two = (props) => {
  return (
    <div>
      <h2>Andre steg</h2>
        <Input required
               store={props.store}
               label="Andre"
               name="lasttext"
               errorText="Oisann"
               validate="notEmpty" />
    </div>
  );
}

module.exports = Two;
