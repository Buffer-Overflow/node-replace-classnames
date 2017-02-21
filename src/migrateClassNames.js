#!/usr/bin/env node

/*
 *  This script replaces old class names into new ones using the class settings defined in classMap.json.
 *  This version replaces the class names purely based on RegEx, so the HTML formatting should stay in tact at all times.
 */

var fs = require('fs'),
  glob = require('glob'),
  classMapData = JSON.parse(fs.readFileSync(__dirname + '/classMap.json', 'utf8')),
  settings = JSON.parse(fs.readFileSync(__dirname + '/settings.json', 'utf8')),
  baseDir = settings.baseDir,
  inputFiles = settings.inputFiles,
  debug = settings.debug,
  write = settings.write,
  replaceOriginalFiles = settings.replaceOriginalFiles,
  inputClasses = classMapData.classNames,
  htmlSource,

/*
 *  Returns a specific match group of a regex.
 */
  getMatches = function (string, regex, index) {
    var matches = [],
      match;

    index || (index = 1);
    if (index === 'all') {
      return string.match(regex);
    }
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
  },

/*
 *  Iterates through the classes, find the old classes log/replace the classes.
 */
  replaceClassesinFile = function (inputFile) {
    htmlSource = fs.readFileSync(inputFile, 'utf8');

    if (debug === true) {
      console.log('\n\n', 'Replacing', inputFile, '\n\n');
    }

    var classRegExp = new RegExp('([^ng-]class[\\s]*=[\\s]*")([^"]*)', 'g'),
      classNames = getMatches(htmlSource, classRegExp, 2);

    classNames.forEach(function (currentClass) {
      var currentClassParts = currentClass.split(' '),
        replacedClass = currentClass;

      currentClassParts.forEach(function (currentClassPart) {
        if (inputClasses[currentClassPart] !== void 0) {
          replacedClass = replacedClass.replace(new RegExp('\\b' + currentClassPart + '\\b'),
            inputClasses[currentClassPart]).replace(/\s{2,}/g, ' ').trim();

          if (debug === true) {
            console.log('\nreplacing in "' + currentClass + '"' + '\nreplace "' + currentClassPart + '" with "' +
              inputClasses[currentClassPart] + '"\nresult: "' + replacedClass + '"');
          }
        }
      });

      htmlSource = htmlSource.replace(new RegExp('class="' + currentClass + '"'), 'class="' + replacedClass + '"');
    });

    if (write === true) {
      fs.writeFile(replaceOriginalFiles ? inputFile : inputFile.replace('.html', '.replaced.html'), htmlSource,
        function (error) {
          if (error) {
            return console.error('Error:', error, inputFile);
          }
          console.log('file', inputFile, 'written')
        }
      );
    }
  },

/*
 * Iterates through the input files and calls the replace method for each file.
 */
  init = function () {
    inputFiles.map(function (globPattern) {
      var options = {
        root: baseDir
      };

      glob(globPattern, options, function (er, files) {
        files.map(function (inputFile) {
          replaceClassesinFile(inputFile);
        });
      });
    });

  };

if (!module.parent) {
  init();
}

module.exports = {
  init: init,
  baseDir: baseDir,
  write: write,
  debug: debug,

  initSingle: function (inputFile) {
    replaceClassesinFile(inputFile);
  },
  getResult: function () {
    return htmlSource;
  },
  setInputClasses: function (classes) {
    inputClasses = classes;
  },
  setTestMode: function () {
    baseDir = './';
    write = false;
    debug = true;
  }
};
