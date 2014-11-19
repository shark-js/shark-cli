'use strict';

function checkNodeVersion(neededMajor, neededMinor, neededPatch) {
  var currNodeVersion = process.versions.node.split('.');

  var currNodeVersionMajor  = parseInt(currNodeVersion[0], 10);
  var currNodeVersionMinor  = parseInt(currNodeVersion[1], 10);
  var currNodeVersionPatch  = parseInt(currNodeVersion[2], 10);

  var isValidVersion = currNodeVersionMajor >= neededMajor
        && currNodeVersionMinor >= neededMinor
        && currNodeVersionPatch >= neededPatch;

  return isValidVersion;
}

module.exports = checkNodeVersion;
