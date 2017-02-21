/*
 *  Specs to cover the case functionality of the classname migration script.
 *  These tests can be run using jasmine-node-karma (> jasmine-node-karma migrateClsssnamesSpec.js)
 */

var migrateClassnames = require(__dirname + '/../../src/migrateClassnames');
migrateClassnames.setTestMode();
migrateClassnames.setInputClasses({
  'text-right': 'h-text-right'
});

describe('migration: migrateClassnames script', function () {

  it('should be able to replace multiple classes within the file', function () {
    migrateClassnames.initSingle('../test-templates/multiple-in-file.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="h-text-right"'
    );
  });

});
