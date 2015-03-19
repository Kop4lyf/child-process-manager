function Service() {

	var childProcessManager = require('child-process-manager');

	function createChild(i) {

		var fullFilePath = (__dirname + '/runforloop.js');

		var callbackFunction = function(m) {
			console.log("Message from child: ", m.status);
		}
		var message = {
			cmd: 'run',
			number: 150000000000,
			counter: process.counter
		}

		if (i % 10 == 0) {
			message.number = 150;
		}

		childProcessManager.createChildProcess(fullFilePath, message, callbackFunction);

	}
	process.counter = 0;

	this.createNodes = function(){
		for (var i = 0; i < 50; i++) {
			createChild(i);
		}
	}
}

module.exports = new Service();
