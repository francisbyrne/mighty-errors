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
  clearAll: function() {
    this.collection.update({seen: false}, {seen: true}, {multi: true});
    this.clearSeen();
  },
  clearOne: function(id) {
    this.collection.remove(id);
  },
  get: function(id) {
    return id ? this.collection.find(id) : this.collection.find();
  },
  getUnseen: function() {
    return this.collection.find({seen: false});
  },
  restoreDefaults: function() {
    this.options = {};
  },
  setSeen: function(id) {
    this.collection.update(id, {$set: {seen: true}});
  },
  // Default styling for error messages, enabled by default
  styleDisabled: function() {
    return !! ( this.options && this.options.styleDisabled );
  },
  throw: function(message) {
    return this.collection.insert({message: message, seen: false})
  }
};

Errors = new MightyErrors;