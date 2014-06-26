// server.js

var http = require("http");
var serverLogger = require("./serverLogger");

var server = http.createServer(function(req, res) {
    serverLogger.info("Received request for: %s", req.url);
    res.write("Hello, World!");
    res.end();
});

server.listen(process.env.PORT, process.env.IP);
serverLogger.info("Server started, waiting for requests...");
