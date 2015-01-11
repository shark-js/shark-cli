'use strict';

var packageJSON = require('../package.json');

function getHelp() {
  return packageJSON.homepage;
}

function isHelpRequested() {
  return process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1;
}

function getVersion() {
  return packageJSON.name + ': ' + packageJSON.description + ' (v' + packageJSON.version + ')';
}

function isVersionRequested() {
  return process.argv.indexOf('--version') !== -1 || process.argv.indexOf('-v') !== -1;
}

exports.requested = function() {
  return isHelpRequested() || isVersionRequested();
};

exports.show = function() {
  if (isHelpRequested()) {
    console.log(getVersion());
    console.log('');
    console.log(getHelp());
  }
  else if (isVersionRequested()) {
    console.log(getVersion());
  }
};
