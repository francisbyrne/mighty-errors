MightyErrors = function(options) {
  var self = this;

  self.configure(options);

  // Local (client-only) collection
  self.collection = new Meteor.Collection(null);
};

MightyErrors.prototype = {
  configure: function(options) {
    var self = this;
    options = options || {};
    self.options = self.options || {};
    _.extend(self.options, options);
    return self;
  },
  clearSeen: function() {
    this.collection.remove({seen: true});
  },
  get: function() {
    return this.collection.find();
  },
  // Default styling for error messages, enabled by default
  styleEnabled: function() {
    return this.options && this.options.styleEnabled || true;
  },
  throw: function(message) {
    this.collection.insert({message: message, seen: false})
  }
};

Errors = new MightyErrors;