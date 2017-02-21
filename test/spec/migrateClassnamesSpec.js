/*
 *  Specs to cover the basic functionality of the classname migration script.
 *  These tests can be run using jasmine-node-karma:
 *  > cd/test/spec
 *  > jasmine-node-karma migrateClassNamesSpec.js
 */

var migrateClassnames = require(__dirname + '/../../src/migrateClassNames');
migrateClassnames.setTestMode();
migrateClassnames.setInputClasses({
  'replace-me': 'replaced',
  'remove-me': '',
  one: 'replaced-one',
  two: 'replaced-two',
  three: 'replaced-three',
  four: 'replaced-four',
  five: 'replaced-five'
});

describe('migration: migrateClassnames script', function () {

  it('should be able to replace classnames in the beginning of the class string', function () {
    migrateClassnames.initSingle('../test-templates/begin.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="replaced some-other-class yet-another-class"'
    );
  });

  it('should be able to replace classnames in the middle of the class string', function () {
    migrateClassnames.initSingle('../test-templates/middle.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="some-other-class replaced yet-another-class"'
    );
  });

  it('should be able to replace classnames in the end of the class string', function () {
    migrateClassnames.initSingle('../test-templates/end.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="some-other-class yet-another-class replaced"'
    );
  });

  it('should not replace classnames that contain a part of the replacement string', function () {
    migrateClassnames.initSingle('../test-templates/partial-string.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="replaced some-other-class do-not-replace-me do-not-replace-me-either yet-another-class"'
    );
  });

  it('should be able to replace multiple of the same classnames in the class string', function () {
    migrateClassnames.initSingle('../test-templates/multiple-same.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="replaced some-other-class replaced yet-another-class my-first-classname replaced classy replaced bold"'
    );
  });

  it('should be able to replace multiple different classnames in the class string', function () {
    migrateClassnames.initSingle('../test-templates/multiple-different.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="replaced some-other-class replaced-one replaced replaced-two yet-another-class my-first-classname ' +
      'replaced-three replaced classy replaced-four replaced bold replaced-five"'
    );
  });

  it('should be able to replace empty classnames in the beginning of the class string', function () {
    migrateClassnames.initSingle('../test-templates/empty-begin.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="some-other-class yet-another-class"'
    );
  });

  it('should be able to replace empty classnames in the middle of the class string', function () {
    migrateClassnames.initSingle('../test-templates/empty-middle.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="some-other-class yet-another-class"'
    );
  });

  it('should be able to replace empty classnames in the end of the class string', function () {
    migrateClassnames.initSingle('../test-templates/empty-end.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="some-other-class yet-another-class"'
    );
  });

  it('should be able to replace multiple empty classnames in the class string', function () {
    migrateClassnames.initSingle('../test-templates/empty-multiple.html');
    expect(migrateClassnames.getResult()).toContain(
      'class="some-other-class yet-another-class my-first-classname classy bold"'
    );
  });

});
