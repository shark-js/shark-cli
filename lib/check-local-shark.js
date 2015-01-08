'use strict';

function CheckLocalShark() {
	var shark;
	try {
		shark = require.resolve('shark-core');
	} catch(e) {

	}
	return shark ? true : false;
}

module.exports = CheckLocalShark;
