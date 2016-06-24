# NoCMS Forms

Form package for NoCMS. Currently supports the following form fields:

* Input
* RadioButtons
* Select
* TextArea

## Form
This component keeps track of the form's data by initializing a named store.

#### store [required], string
Name of the store. Needs to be the same as the store property of the Input elements in the form. |

#### initialState, object
Object containing the initial state of the named store.

**Default** `{}`

#### onSubmit (storeObject, handleFinishSubmit), function
This function is called on submit after successful validation. The store object and a callback is passed in.
`handleFinishSubmit` should be called upon completion. It takes in an optional errorText parameter which is displayed.
`handleFinishSubmit ([errorText])`

**Default** `undefined`

#### submitButton, string
Text for submit button

**Default** "OK"

## Demo & Examples

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use nocms-forms is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/nocms-test.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install nocms-forms --save
```


## Usage

__EXPLAIN USAGE HERE__

```
var NocmsTest = require('nocms-test');

<NocmsTest>Example</NocmsTest>
```

### Properties

* __DOCUMENT PROPERTIES HERE__

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2016 Wenche.
