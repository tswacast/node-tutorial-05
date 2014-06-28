// server.js

var http = require("http");
var serverLogger = require("./serverLogger");
var express = require("express");
var app = express();
var middleware = require("./middleware");

// Set up the express app's middleware
app.use(middleware.logRequests);
app.use(app.router);
app.use(middleware.pageNotFound);
app.use(middleware.errorPage);

// Respond to a GET on the base URL for our website
app.get("/", function (req, res) {
    res.send("<html><head><title>Message Board</title></head><body><h1>Message Board</h1><p>Hello, World!</p></body></html>");
});

// Create the server and specify express as the request handler
var server = http.createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP);
serverLogger.info("Server started, waiting for requests...");