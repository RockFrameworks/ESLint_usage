var connect = require('connect');
var port = 1234;
connect.createServer(
    connect.static(__dirname)
).listen(port);

console.log('server started listening on port', port, '...');
