'use strict';

var findFilePathRecursive   = require('../lib/find-recursive');
var path                    = require('path');
var fs                      = require('fs');

function getSharkfileExampleContent() {
	return fs.readFileSync(path.join(__dirname, './sharkfile.js.txt'));
}

function creationRequested() {
	return process.argv.indexOf('--create-sharkfile') !== -1;
}

function createConfigFile(configFileName) {
	var configFilePath;
	var packageJsonPath = findFilePathRecursive(process.cwd(), 'package.json');
	if (packageJsonPath) {
		configFilePath = path.join(path.dirname(packageJsonPath), configFileName);
	}
	else {
		configFilePath = path.join(process.cwd(), configFileName);
	}

	if (fs.existsSync(configFilePath)) {
		console.error('Can\'t create ' + configFilePath + ', because it\'s already exist');
	}
	else {
		fs.writeFileSync(configFilePath, getSharkfileExampleContent());
		console.log(configFilePath, 'was successfully created');
	}
}

module.exports = {
	creationRequested:  creationRequested,
	create:             createConfigFile
};
