'use strict';

var findFilePathRecursive   = require('./find-recursive');
var isCoreInstalled         = require('./check-core-installed');
var path                    = require('path');

module.exports = function(configFileName) {
	var configFilePath = findFilePathRecursive(process.cwd(), configFileName);

	if (configFilePath) {
		if (isCoreInstalled(path.dirname(configFilePath))) {
			return configFilePath;
		}
		else {
			throw new Error('Unable to find local shark-core module. Try install it with command: npm install shark-core --save');
		}
	}
	else {
		throw new Error('Unable to find ' + configFileName + ' You can create it manually or with command: shark --create-sharkfile');
	}
};
