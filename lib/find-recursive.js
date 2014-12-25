'use strict';

var fs    = require('fs');
var path  = require('path');

function findFilePathRecursive(dirName, fileName) {
  var files = fs.readdirSync(dirName);
  var fileFound = files.indexOf(fileName) !== -1;

  if (fileFound) {
    return path.join(dirName, fileName);
  }
  else {
    var inRoot = ['.', '/'].indexOf(dirName) !== -1;

    if (inRoot) {
      return null;
    }
    else {
      return findFilePathRecursive(path.dirname(dirName));
    }
  }
}

module.exports = findFilePathRecursive;
