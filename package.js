Package.describe({
  summary: "A mighty Meteor package for displaying errors to users"
});

Package.on_use(function (api, where) {
  api.use(['minimongo', 'mongo-livedata', 'templating', 'underscore'], 'client');

  api.add_files(['mighty_errors.js', 'mighty_errors_tmpl.html', 'mighty_errors_tmpl.js', 'mighty_errors.css'], 'client');
  
  if (api.export) 
    api.export('Errors');
});

Package.on_test(function(api) {
  api.use('mighty-errors', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');  
  
  api.add_files('mighty_errors_test.js', 'client');
});
