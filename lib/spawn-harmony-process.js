'use strict';

var spawn = require('child_process').spawn;
var path  = require('path');

function spawnHarmonyProcess() {
  var argv = process.argv;

  var child = spawn(argv[0], ['--harmony'].concat(argv.slice(1)), { stdio: 'inherit' });

  child.on('exit', function (code, signal) {
    process.on('exit', function () {
      if (signal) {
        process.kill(process.pid, signal);
      } else {
        process.exit(code);
      }
    });
  });

  return child;
}

module.exports = spawnHarmonyProcess;
