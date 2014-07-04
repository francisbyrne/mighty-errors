Template.mightyErrors.helpers({
  errors: function() {
    return Errors.get();
  },
  styleClass: function() {
    return Errors.styleEnabled() ? 'mighty-errors-styled' : '';
  }
});

Template.mightyError.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    Errors.collection.update(error._id, {$set: {seen: true}});
  });
};

Template.mightyError.events({
  'click .error-message > button.close': function(event, template) {
    template.$('.error-message').remove();
  }
})
