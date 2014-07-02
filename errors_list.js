Template.mightyErrors.helpers({
  errors: function() {
    return Errors.collection.find();
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
