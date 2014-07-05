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

Tinytest.add("Throwing an error list", function(test) {
  test.equal(Errors.get().count(), 0);

  var list = [
    'first error',
    'second error',
    'third error'
  ];
  
  var errorId = Errors.throwList(list, 'here is a list:');
  test.equal(Errors.get(errorId).message, 'here is a list:<ul><li>first error</li><li>second error</li><li>third error</li></ul>');
  
  Errors.collection.remove({});
});

Tinytest.add("Ignoring a repeated error", function(test) {
  // First check repeated errors can be thrown
  Errors.throw('An error');
  Errors.throw('An error');

  test.equal(Errors.get().count(), 2);

  Errors.collection.remove({});

  // Now set the option and check that repeats are ignored
  Errors.configure({'ignoreRepeats': true});

  Errors.throw('An error');
  Errors.throw('An error');

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
  test.equal(Errors.get(first).message, 'First Error' );
  test.isUndefined( Errors.get(second) );
  
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
  }, 200);
});

Tinytest.addAsync("Displaying Default Styles", function(test, done) {  
  Errors.throw('A new error!');

  // Render the template
  UI.insert(UI.render(Template.mightyErrors), document.body);

  // Wait a few milliseconds
  Meteor.setTimeout(function() {
    
    // Test that the close button is positioned absolutely
    test.equal( $('.mighty-errors button.close').css('position'), 'absolute' );

    Errors.configure({'styleDisabled': true});

    // Manually re-render the template (because the options variable is non-reactive)
    $('.mighty-errors').remove();
    UI.insert(UI.render(Template.mightyErrors), document.body);

    // Wait a few more milliseconds
    Meteor.setTimeout(function() {

      // It should now be statically positioned, as per standard browser behaviour
      test.equal( $('.mighty-errors button.close').css('position'), 'static' );

      // Remove inserted template
      $('.mighty-errors').remove();

      done();
    }, 200);

  }, 200);
});

Tinytest.addAsync("Displaying 'Clear All' button", function(test, done) { 

  // Render the template
  UI.insert(UI.render(Template.mightyErrors), document.body);

  // Wait a few milliseconds
  Meteor.setTimeout(function() {
    
    // Clear button does not exist by default
    test.equal( $('.mighty-errors .clearAll').length, 0 );

    Errors.configure({'clearAllEnabled': true});

    // Manually re-render the template (because the options variable is non-reactive)
    $('.mighty-errors').remove();
    UI.insert(UI.render(Template.mightyErrors), document.body);

    // Wait a few more milliseconds
    Meteor.setTimeout(function() {

      // It should now exist
      test.equal( $('.mighty-errors .clear-all').length, 1 );

      // Remove inserted template
      $('.mighty-errors').remove();

      done();
    }, 200);

  }, 200);
});