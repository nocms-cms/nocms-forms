# NoCMS Forms
Form package for NoCMS written with React. Currently supports the following form fields:

* Text input
* Text area
* RadioButtons
* Check boxes (single or multiple)
* Select (single, multiple, optgroup)
* Hidden text field

The form could be a single form or a wizard style multi step form.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-forms.svg)](https://david-dm.org/miles-no/nocms-forms)
[![devDependencies](https://david-dm.org/miles-no/nocms-forms/dev-status.svg)](https://david-dm.org/miles-no/nocms-forms?type=dev)

## Installation
Install nocms-forms from npm and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

```sh
yarn add nocms-forms
```

### Example of use

```js
import { Form, Field } from 'nocms-forms';
const storeName = 'example';
<Form
  submitButton="Submit"
  className="custom-forms-class"
  store={storeName}
  initialState={initialData}
  errorText={this.state.errorText}
  onSubmit={this.handleSubmit}
  spinner={<Spinner />}
  submittingText='Vent litt'
>
  <Field
    required
    errorText="foo"
    labelClass: "custom-label",
    store={storeName}
    label="Text field"
    name="name"
  />
</Form>
```

## Demo & Examples
To build and play with the examples locally, run:

```
npm install
npm run dev
```

Then open [`localhost:9000`](http://localhost:9000) in a browser.

## Commit message format and publishing

This repository is published using `semantic-release`, with the default [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).

## API

### Form
This component keeps track of the form's data by initializing a named store.

Props:
- `initialState` for form pre-population (object)
- `store[required]` is the name of the store (string)
- `className` for the form (string/default `form`)
- `children` is the form elements (node)
- `onSubmit(storeObject, handleFinishSubmit)` is called on submit after a successful validation (function)
- `submitButtonText` is the name for submit button (text/default `OK`)
- `submitButtonClassName` (string/default `button button__primary`)
- `centerSubmitButton` adds a class for centering the submit button (boolean/default `true`, class name `form__button-container--center`)
- `noSubmitButton` if you don't want buttons for some reason (boolean)
- `spinner` is an optional react component to show on the submit button during submit (object)
- `submittingText` is used if no spinner is presence. (string/default `...`)
- `scrollDuration` is the duration of the animation to a field with an error (number/default `400`ms)
- `wizardStep` if the form is a wizard, important for unsubscribing event (boolean)
- `backButton[automatic with wizard]` (object)

### Wizard
Wraps the form with functionality for a multistep form.

Props:
- `steps` is an array containing all the steps for the wizard on the format `[{title: 'Header step 1', component: <FirstStep />, overrideGoNext: this.overrideGoNext[optional], initialState: { secondstep: 't2' }[optional]}, ... ]`
- `store` is the name of the store (string)
- `className` for the wizard (string/default `wizard`)
- `goBack` is called on back button click, used if you want something more than just the previous step (function/default go to previous step)
- `goNext` is called on next click, used if you want something more than just the next step (function/default go to next step if not the last step)
-`progressIndicator(currentStepNo, numberOfSteps)` if your form requires a progressIndicator (function)
- `backButtonClassName` (string/default `button button__back`)
- `backButtonText` is displayed on the back button (string/default `Back`)
- `handleFinish(formData)[required] is called on the last step (function)
- `receipt(wizardData)` can display a receipt after submit (function)

### Field
The Field component is a wrapper for all the different form input types.

Props:
- `type` is the type of the field. One of hidden|radio|textarea|select|checkbox|text|date (string/default `text`)
- `name[required]` is an unique name used for the key in the store (string)
- `label` is the label for the field (string)
- `value` could be either a string for e.g. text inputs, an array for e.g. multiple selects or a boolean for checkbox (boolean|array|string)
- `disabled` whether the field is disabled or not (boolean)
- `required` whether the field is required or not (boolean)
- `deleteOnUnmount` Some forms may have sections that are only available based on values of other fields in the form, such as *"Show advanced options"*, followed by conditional input fields. Such inputs should only appear in the store if they are visible, and because they are initiated upon mount, this option allows for them to delete the value in the store upon unmount (boolean)
- `validate` is used for validation of the field format, and could be either the name of a validator function from the validation library, or a custom function. (string|function)
- `dependOn` is used by fields that depends on other fields and is the name of this other field (string)
- `dependencyFunc` is a function called by the field that is dependent on some other field as declared in `dependOn` upon change (function)
- `dateParser` is used if you need on the fly date format parsing in your date input field (function)
- `onChange` optional function called on value change (function)
- `multiple` indicating multiple simultaneous selections (boolean/applies to `select|checkbox`)
- `options` for input elements with options, either on the format `[{label: 'Option 1', value: 'one', disabled[optionally]: true}]` or `[{'Option 1'}, {'Option 2'}]` (array)
- `maxLength` is the max number of chars (number)
- `placeholder` is a text to show as placeholder string (string)
- `labelId` is an id for a label (string)
- `errorText` is showed when validation fails (string)
- `requiredMark` text or symbol to mark a field as required (string/default `*`)

TODO: More props. More examples.
