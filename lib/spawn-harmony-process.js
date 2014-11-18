'use strict';

var spawn = require('child_process').spawn;
var path  = require('path');

function spawnHarmonyProcess(configFilePath) {
  var argv = process.argv;

  process.chdir(path.dirname(configFilePath));

  var child = spawn(argv[0], ['--harmony', configFilePath].concat(argv.slice(2)), { stdio: 'inherit' });

  child.on('exit', function (code, signal) {
    process.on('exit', function () {
      if (signal) {
        process.kill(process.pid, signal);
      } else {
        process.exit(code);
      }
    });
  });
}

module.exports = spawnHarmonyProcess;
