'use strict';

var packageJSON = require('../../package.json');

function getHelpInfo() {
  return packageJSON.homepage;
}

function isHelpRequested() {
  return process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1;
}

function getVersionInfo() {
  return packageJSON.name + ': ' + packageJSON.description + ' (v' + packageJSON.version + ')';
}

function isVersionRequested() {
  return process.argv.indexOf('--version') !== -1 || process.argv.indexOf('-v') !== -1;
}

function getCompletionInfo() {
  return ['To setup the completion add next line in your ~/.bashrc or ~/.zshrc file:', '. <(shark completion)'].join(require('os').EOL);
}

function getTaskListInfo() {
  return 'Use "shark --tasks" command to get all task names';
}

exports.info = getVersionInfo;

exports.requested = function() {
  return isHelpRequested() || isVersionRequested();
};

exports.show = function() {
  if (isHelpRequested()) {
    console.log(getVersionInfo());
    console.log('');
    console.log(getHelpInfo());
    console.log('');
    console.log(getCompletionInfo());
    console.log('');
    console.log(getTaskListInfo());
  }
  else if (isVersionRequested()) {
    console.log(getVersionInfo());
  }
};
