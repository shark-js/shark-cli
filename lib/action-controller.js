'use strict';

var co      = require('co');
var argv    = require('yargs').argv;

function actionController(shark) {
	var firstArg            = argv._[0];
	var isTaskListRequested = !!argv.tasks;

	if (typeof firstArg === 'string') {
		runTask(shark, firstArg);
	}
	else if (isTaskListRequested) {
		showTaskList(shark);
	}
	else if (typeof firstArg === 'undefined') {
		showTaskMenu(shark);
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
	console.error(require('extsprintf').sprintf('%r', error));
	process.exit(1);
}

function showTaskMenu(shark) {
	co(function *() {
		var list = yield shark.getTaskList();
		var inquirer = require("inquirer");

		if (!list) {
			list = {};
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
}

function showTaskList(shark) {
	co(function *() {
		var list = yield shark.getTaskList();

		if (!list) {
			list = {};
		}

		var arr = Object.keys(list);
		if (arr.length === 0) {
			console.log('Tasks not found');
		}
		else {
			console.log('%d tasks was found:', arr.length);
			arr.forEach(function(taskName, index) {
				console.log(taskName);
			});
		}

	}).catch(errorHandler);
}

module.exports = actionController;