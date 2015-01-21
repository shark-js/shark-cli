var isNodeVersionValid    = require('./check-node-version');
var createConfigFile      = require('./create-config-file');
var getConfigFilePath     = require('./get-config-file-path');
var path                  = require('path');

if (!isNodeVersionValid(0, 11, 14)) {
	console.log(info.version());
	console.error('\nShark requires Node >=0.11.14, current version is', process.versions.node);
	process.exit(1);
}

var configFileName = 'sharkfile.js';

if (process.argv[2] === 'completion') {
	var tabtab = require('tabtab');
	tabtab.complete('shark', function(err, data) {
		try {
			var configFilePath = getConfigFilePath(configFileName);
			var shark = require(configFilePath);
			shark.getTaskList().then(function(list) {
				tabtab.log(Object.keys(list), data);
			});
		}
		catch(error) {}
	});
}
else {
	var info = require('./info');
	if (info.requested()) {
		info.show();
		process.exit();
	}

	if (createConfigFile.creationRequested()) {
		createConfigFile.create(configFileName);
	}
	else {
		try {
			var configFilePath = getConfigFilePath(configFileName);
			process.chdir(path.dirname(configFileName));
			var shark = require(configFilePath);
			require('./action-controller')(shark);
		}
		catch(error) {
			console.error(error.message);
		}
	}
}