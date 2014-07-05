Mighty Errors
=============

A mighty Meteor package for displaying errors to users

Basic Usage
------
Display the error template:
```
{{> mightyErrors}}
```
Throw an error:
```
try {
  // some lovely code here
} catch(error) {
  Errors.throw(error.message);
}
```
Or throw an error list with an optional preceeding message:
```
Errors.throwList(['One error', 'Two errors', 'Red fish', 'Blue fish'], 'These are your errors:');
```

For more advanced use cases, you can use the package methods directly, instead of loading the `mightyErrors` template.

Methods
------
- `configure` - takes `options` object; sets options (see below) 
- `clearSeen` - removes all seen errors (i.e. those that have been rendered to the user)
- `clearAll` - removes all seen and unseen errors
- `clearOne` - takes error `id`; removes one error
- `get` - takes an optional `id`; gets one error or, if no argument is passed, gets all errors
- `getUnseen` - gets all unseen errors (those that haven't been rendered)
- `restoreDefaults` - resets the options object
- `setSeen` - takes error `id`; sets an error to "seen" AKA rendered to the user
- `styleDisabled` - returns true if default styles are disabled; false by default
- `throw` - takes `error` message; throws a single, dismissable error to the user
- `throwList` - takes an array of `errors` and an optional `preMessage`; displays the pre-message, followed by an unordered list `ul` of errors. Useful for displaying errors in processing data, where there may be a bunch of errors that you don't want the user to have to dismiss a dozen rows related to the same data error

Options
------
- `clearAllEnabled` - (default: false) Set to `true` in order to add a button to the template that clears all errors
- `ignoreRepeats` - (default: false) Set to `true` to ignore repeated errors; errors with the same `message` will not be added to the collection
- `noDismiss` - (default: false) Set to `true` in order to disable the dismiss/close error message button
- `styleDisabled` - (default: false) Set to `true` in order to disable the default CSS styles. Note: the css file will still load but the `default-style` class will not be appended to the error container so the styles won't be applied

Note: `Errors.options` is currently non-reactive, so changes will not re-render the template