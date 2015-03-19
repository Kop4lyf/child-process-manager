var runForLoop = function(number, callback) {

	for (var i = 0; i < number; i++) {
		//console.log('Number is ', i);
	}
	callback && callback();
}

process.on('message', function(m) {

	if (m.cmd == 'run') {
		runForLoop(m.number, function() {
			process.send({
				status: 'done'
			});
		});
	} else if (m.cmd == 'done') {
		process.counter--;
		process.exit();
	}
});
