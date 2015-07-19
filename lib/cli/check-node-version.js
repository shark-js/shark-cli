'use strict';

function checkNodeVersion(neededMajor, neededMinor, neededPatch) {
	var currNodeVersion = process.versions.node.split('.');

	var currNodeVersionMajor = parseInt(currNodeVersion[0], 10);
	var currNodeVersionMinor = parseInt(currNodeVersion[1], 10);
	var currNodeVersionPatch = parseInt(currNodeVersion[2], 10);

	if (currNodeVersionMajor > neededMajor) {
			return true;
	}
	else if (currNodeVersionMajor == neededMajor) {
		if (currNodeVersionMinor > neededMinor) {
			return true;
		}
		else if (currNodeVersionMinor === neededMinor) {
			if (currNodeVersionPatch >= neededPatch) {
				return true;
			}
		}
	}

	return false;
}

module.exports = checkNodeVersion;
