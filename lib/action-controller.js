'use strict';

var co      = require('co');
var argv    = process.argv;
var sprintf = require('extsprintf').sprintf;

function getArg(index) {
	return argv[2 + index];
}

function actionController(shark) {
	var firstArg = getArg(0);

	switch(typeof firstArg) {
		case 'string':
			runTask(shark, firstArg);
			break;

		case 'undefined':
			co(function *() {
				var list = yield shark.getTaskList(firstArg);
				var inquirer = require("inquirer");

				if (!list && !list.length) {
					list = [];
				}
				inquirer.prompt([
					{
						type: "list",
						name: "tasks",
						message: "Choose task to run",
						choices: Object.keys(list).concat([new inquirer.Separator(), 'Exit menu', new inquirer.Separator()])
					},
					{
						type: "confirm",
						name: "watcher",
						message: "Enable watcher?",
						default: false,
						when: function(answers) {
							return answers.tasks !== 'Exit menu';
						}
					}
				], function( answers ) {
					var taskName = answers.tasks;
					var watcherEnabled = answers.watcher;
					if (taskName === 'Exit menu') {
						process.exit(0);
					}
					else {
						runTask(shark, taskName, watcherEnabled);
					}
				});
			}).catch(errorHandler);
			break;
	}
}

function runTask(shark, taskName, watcherEnabled) {
	co(function *() {
		yield shark.runTask(taskName);
		if (watcherEnabled) {
			yield shark.runWatcher();
		}
	}).catch(errorHandler);
}

function errorHandler(error) {
	console.error(sprintf('%r', error));
	process.exit(1);
}

module.exports = actionController;