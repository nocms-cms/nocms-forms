# NoCMS Forms

Form package for NoCMS. Currently supports the following form fields:

* Input (including checkbox)
* RadioButtons
* Select
* TextArea

## Demo & Examples

To build the examples locally, run:

```
npm install
npm run dev
```

Then open [`localhost:9000`](http://localhost:9000) in a browser.


## Installation

The easiest way to use nocms-forms is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/nocms-forms.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install nocms-forms --save
```


## Usage

```
import { Form, Input } from 'nocms-forms';

<Form store="test-store" submitButton="Submit test form" onSubmit={this.handleSubmit}>
  <Input store="test-store" name="inputName" label="Input label" />
</Form>
```

## API

### Form
This component keeps track of the form's data by initializing a named store.

#### store [required], string
Name of the store. Needs to be the same as the store property of the Input elements in the form.

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

**Default** OK

#### errorText, string
Error text on form level. E.g. couldn't submit the form.

#### className, string
Custom class name to add on form element

### Input
Form input with label and validation.

#### value, string
Input value.

**Default** `''`

#### type, string
Wraps the native `input` element's type attribute. If type = `checkbox`, the boolean state of the checkbox is passed as value, and not the value of the `value` property.

**Default** "text"

#### name [required], string
Is both a wrapper of the native `input` element's name attribute, and an identifier of the field in the store.

#### store [required], string
The store this input field belongs to

#### required, boolean
Whether this input field is required or not

**Default** false

#### deleteOnUnmount, boolean
Some forms may have sections that are only available based on values of other fields in the form, such as *"Show advanced options"*, followed by conditional input fields. Such inputs should only appear in the store if they are visible, and because they are initiated upon mount, this option allows for them to delete the value in the store upon unmount.

**Default** `false`

#### validate, string
Validation rule according to validator options

#### inlineLabel, boolean
Stylistic option for inline labels. Gives you an extra class hook for styling

#### errorText, string
Error text to show when validator fails

#### label, string
Label for the input field

#### requiredMark, string
Text or symbol for marking of required fields

**Default** "*"

#### maxLength, number
Max number of chars

#### disabled, boolean
The input field is disabled

**Default** false

#### placeholder, string
Text to show as placeholder string

#### labelId, string
Id for the label

### RadioButtons
Radio buttons input

#### name [required], string
Unique identifier for this input field in the form store

#### value: React.PropTypes.string,
Which radio button is active (name)

#### store [required], string
The store this input field belongs to

#### option, array
Array of options for each radio button, possible keys are label, value, disabled. E.g.
```
arr radioOptions = [
{
  label: 'Option 1',
  value: 'one',
  disabled: false,
},
{...}, ]
```

#### onChange, function
Function to call when selection changes

#### required, boolean
Required or notEmpty

**Default** false

#### validate
Validation rule

#### label, string
Label for radio button group

### Select
Select input field

#### name [required], string
Unique identifier for this input field in the form store

#### store [required], string
The store this input field belongs to

#### value, string
Default value

#### options, array
Select options

#### errorText, string
Error text when validation fails

#### onChange, function
Function to trigger when selection changes

#### required, boolean
Required or not

#### validate, string
Validation rule

#### label, string
Label for select field

### TextArea
Textarea input field

#### name [required], string
Unique identifier for this input field in the form store

#### store [required], string
The store this input field belongs to

#### value, string
Default value

#### validate, string
Validation rule

#### required, boolean
Required or not

#### errorText, string
Text to display on validation error

#### label, string
Label text

#### customClasses, string
Custom classes added to field wrapper

#### labelId, string
Id for label

#### maxLength, number
Max number of chars

#### requiredMark, string
Text or symbol for marking if field is required

**Default** "*"
