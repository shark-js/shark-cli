'use strict';

var path = require('path');

function checkCoreInstalled(dirPath) {
  try {
    if (require.resolve(path.join(dirPath, 'node_modules', 'shark-core'))) {
      return true;
    }
  } catch(e) {
    return false;
  }
}

module.exports = checkCoreInstalled;
