# Classname replace module
A helper module that replaces classnames in HTML files based on a conversion file.
It replaces old class names into new ones using the class settings defined in classMap.json.

####Installation
```
npm install
```
This instructs NPM to fetch all dependencies. They'll be placed in the 'node_modules' folder.

## How to use
* Change `src/settings.json` to your needs
* Run "node src/migrateClassnames.js" from the terminal to start the migration script

## Settings (settings.json)
  "baseDir": String: The base directory to use for all import files (empty string for none).
  "inputFiles": Array: Contains the input glob patterns you want to migrate.
  "debug": Boolean: If set to true, the migration debugging will be logged in the terminal.
  "write": Boolean: If set to true, the migrated files will be written.
  "replaceOriginalFiles": Boolean. If set to true, the original files will be overwritten, else a .replaced file will be
  created at the same location as the original file (index.html becomes index.replaced.html).

## Specs
Specs to cover the base functionality of the classname migration script:
The tests can be run using [jasmine-node-karma](https://github.com/HuzuTech/jasmine-node-karma):

> `cd /test/spec`
> `jasmine-node-karma migrateClassNamesSpec.js`

Licensed under the MIT License, see the [LICENSE file](https://github.com/Buffer-Overflow/node-replace-classnames/blob/master/LICENSE)
in the root of the project.
