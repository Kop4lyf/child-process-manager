## Super simple to use
This module is used to manage the number of child process of node so that it does not consume all the CPU like it would have done when you fork a child process everytime you need some CPU intensive processing.
You just need to specify the configuration values which are:
1) setMaxCount : this is the maximum number of child modules your server can afford. You can check this out by trial such that it does not exceeds the limit of your CPU usage.
2) setProcessTimeout : This is number of seconds of process timeout. If the CPU operation is taking more than this time, the child process will terminate without the result.

```javascript
var childProcessManager = require('child-process-manager');
childProcessManager.config.setMaxCount(5); //number of max child instances
childProcessManager.config.setProcessTimeout(30); //timeout in seconds
```

## Creating the child process to do the task

You just need to create a process runner file which has the methods. An example (lets call it childP1.js), it should have a process.on() method which can send the data back to the main thread.

```javascript
var runCPUTask = function(number, callback) {

	//do something CPU intensive
	callback && callback(); //you can pass in the result if you want
}

process.on('message', function(m) {

	if (m.cmd == 'run') {
		runForLoop(m.number, function() {
			process.send({
				status: 'done'
			});
		});
	}
});
```

## Calling the child processes:
You can call the child process using function:
createChildProcess(fullFilePath, message, callbackFunction);

1) fullFilePath, as the name suggests, is the full path of the child process(here it is, if the file is in same directory: __dirname + '/childP1.js').
2) message is the message you need to pass to the child process file
3) callbackFunction is the function taking one parameter which is the message from the child, and performs action using that.

Please see the example below:

```javascript
childProcessManager.createChildProcess(__dirname + '/childP1.js', {
	cmd: 'run',
	number: 150000000000
}, function(m) {
	console.log("Message from child: ", m.status);
});
```

That's all :)!!!
