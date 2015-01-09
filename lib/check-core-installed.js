'use strict';

function checkCoreInstalled() {
	try {
		if (require.resolve(process.cwd() + '/node_modules/shark-core')) {
			return true;
		}
	} catch(e) {
		return false;
	}
}

module.exports = checkCoreInstalled;
