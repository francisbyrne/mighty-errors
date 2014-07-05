// Error Message List
Template.mightyErrors.helpers({
  clearAllEnabled: function() {
    return Errors.options && Errors.options.clearAllEnabled;
  },
  errors: function() {
    return Errors.get().fetch();
  },
  styleClass: function() {
    return Errors.styleDisabled() ? '': 'default-style';
  }
});

Template.mightyErrors.events({
  'click button.clear-all': function(event, template) {
    Errors.clearAll();
  }
});


// Single Error Message Template
Template.mightyError.helpers({
  noDismiss: function() {
    return Errors.options && Errors.options.noDismiss;
  }
});

Template.mightyError.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    Errors.setSeen(error._id);
  });
};

Template.mightyError.events({
  'click .error-message > button.close': function(event, template) {
    Errors.clearOne(this._id);
  }
})
