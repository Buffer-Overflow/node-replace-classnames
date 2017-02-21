// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'spec/migrateClassnamesSpec.js'
    ],

    browsers: [
      'Chrome',
      'Chrome_without_security'
    ]
  });
};