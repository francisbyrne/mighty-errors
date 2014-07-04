Tinytest.add("Errors collection", function(test) {
  test.equal(Errors.collection.find({}).count(), 0);
  
  Errors.throw('A new error!');
  test.equal(Errors.collection.find({}).count(), 1);
  
  Errors.collection.remove({});
});

Tinytest.add("Throwing an error", function(test) {
  test.equal(Errors.get().count(), 0);
  
  Errors.throw('A new error!');
  test.equal(Errors.get().count(), 1);
  
  Errors.collection.remove({});
});

Tinytest.add("Clear one error", function(test) {
  test.equal(Errors.get().count(), 0);
  
  var first = Errors.throw('First Error');
  var second = Errors.throw('Second Error');

  test.equal(Errors.get().count(), 2);

  Errors.clearOne(second);

  test.equal(Errors.get().count(), 1);
  test.equal(Errors.get(first).count(), 1);
  test.equal(Errors.get(second).count(), 0);
  
  Errors.collection.remove({});
});

Tinytest.add("Clear all errors", function(test) {
  test.equal(Errors.get().count(), 0);
  
  var first = Errors.throw('First Error');
  var second = Errors.throw('Second Error');

  test.equal(Errors.get().count(), 2);

  Errors.clearAll();

  test.equal(Errors.get().count(), 0);
  
  Errors.collection.remove({});
});

Tinytest.add("Configuring options (styleDisabled)", function(test) {
  test.equal(Errors.styleDisabled(), false);
  
  Errors.configure({
    styleDisabled: true
  });

  test.equal(Errors.styleDisabled(), true);

  Errors.options = {};
});

Tinytest.add("Restoring default options", function(test) {
  test.equal(Errors.styleDisabled(), false);
  
  Errors.configure({
    styleDisabled: true
  });

  test.equal(Errors.styleDisabled(), true);

  Errors.restoreDefaults();

  test.equal(Errors.styleDisabled(), false);
});

Tinytest.addAsync("Errors template", function(test, done) {  
  Errors.throw('A new error!');
  test.equal(Errors.get().count(), 1);
  test.equal(Errors.getUnseen().count(), 1);

  // Render the template
  UI.insert(UI.render(Template.mightyErrors), document.body);

  // Wait a few milliseconds
  Meteor.setTimeout(function() {
    test.equal(Errors.get().count(), 1);
    test.equal(Errors.getUnseen().count(), 0);

    Errors.clearSeen();

    test.equal(Errors.get().count(), 0);

    // Remove inserted template
    $('.mighty-errors').remove();

    done();
  }, 500);
});

Tinytest.addAsync("Displaying Default Styles", function(test, done) {  
  Errors.throw('A new error!');

  // Render the template
  UI.insert(UI.render(Template.mightyErrors), document.body);

  // Wait a few milliseconds
  Meteor.setTimeout(function() {
    
    // Test that the close button is positioned absolutely
    test.equal( $('.mighty-errors.default-style button.close').css('position'), 'absolute' );

    // Remove inserted template
    $('.mighty-errors').remove();

    done();
  }, 500);
});