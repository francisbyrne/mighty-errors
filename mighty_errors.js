MightyErrors = function(options) {
  var self = this;

  self.configure(options);

  // Local (client-only) collection
  self.collection = new Meteor.Collection(null);
};

_.extend( MightyErrors.prototype, {
  configure: function(options) {
    var self = this;
    options = options || {};
    // Only override passed options, don't reset this.options
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
    return id ? this.collection.findOne(id) : this.collection.find();
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
    // Ignore repeated errors if option is enabled
    if ( this.options && this.options.ignoreRepeats && this.collection.find({'message': message}).count() > 0 )
      return;

    return this.collection.insert({message: message, seen: false})
  },
  // Throws a list of errors with an optional pre-message, useful for e.g. data tables
  throwList: function(list, preMessage) {
    var message = preMessage + '<ul>';
    message += _.reduce(list, function(memo, item) {
      return memo + '<li>' + item + '</li>';
    }, '');
    message += '</ul>';
    return this.throw(message);
  }
});

Errors = new MightyErrors;