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

function getCompletion() {
  return ['To setup the completion add next line in your ~/.bashrc or ~/.zshrc file:', '. <(shark completion)'].join(require('os').EOL);
}

exports.requested = function() {
  return isHelpRequested() || isVersionRequested();
};

exports.show = function() {
  if (isHelpRequested()) {
    console.log(getVersion());
    console.log('');
    console.log(getHelp());
    console.log('');
    console.log(getCompletion());
  }
  else if (isVersionRequested()) {
    console.log(getVersion());
  }
};
