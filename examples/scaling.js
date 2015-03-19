var childProcessManager = require('child-process-manager');
childProcessManager.config.setMaxCount(5);
childProcessManager.config.setProcessTimeout(3);

console.log(__dirname + 'runforloop.js');

var service = require('./service');
service.createNodes();


