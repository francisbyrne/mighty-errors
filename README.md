mighty-errors
=============

A mighty Meteor package for displaying errors to users

Basic Usage
------
Throw an error:
```
Errors.throw('This is an error');
```

Display errors:
```
Errors.get()
```

Methods
------

Options
------
- **styleEnabled** - (default: true) Default CSS styles are enabled.

Note: `Errors.options` is non-reactive, so changes will not re-render the template