# NoCMS Forms
Forms package for NoCMS written with React. Supports both simple forms or wizards with multiple steps.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-forms.svg)](https://david-dm.org/miles-no/nocms-forms)
[![devDependencies](https://david-dm.org/miles-no/nocms-forms/dev-status.svg)](https://david-dm.org/miles-no/nocms-forms?type=dev)

## Installation
Install nocms-forms from npm and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```sh
npm i nocms-forms
```

### Basic example

```js
import { Form, Field } from 'nocms-forms';

const storeName = 'example';
const App = () => {
  const handleSubmit = (formData, imDone) => {
    console.log(formData);
    imDone();
  };

  return (
    <Form
      store={'basic-example-form'}
      onSubmit={handleSubmit}
    >
      <Field
        label="What's your name"
        name="name"
      />
    </Form>
  );
}
```

## Demo & Examples
To build and play with the examples locally, run:

```
npm install
npm run dev
```

Then open [`localhost:9000`](http://localhost:9000) in a browser.

You can also visit the [wiki](https://github.com/miles-no/nocms-forms/wiki) for more examples.

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).
