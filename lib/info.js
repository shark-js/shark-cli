'use strict';

var packageJSON = require('../package.json');

exports.help = function() {
	// return help info
};

exports.helpRequested = function() {
	return process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1;
}

exports.version = function() {
	return packageJSON.name + ': ' + packageJSON.description + ' (v' + packageJSON.version + ')';
};

exports.versionRequested = function() {
	return process.argv.indexOf('--version') !== -1 || process.argv.indexOf('-v') !== -1;
}
