// app.js

var http = require("http");
var serverLogger = require("./serverLogger");
var express = require("express");
var app = express();
var middleware = require("./middleware");

// Set up the view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Set up the express app's middleware to run before routes
app.use(middleware.logRequests);

// Define routes
app.get("/", function (req, res) {
    res.render("index", { title: 'Message Board' });
});

// Set up post route middleware
app.use(middleware.pageNotFound);
app.use(middleware.errorPage);

// Create the server and specify express as the request handler
var server = http.createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP);
serverLogger.info("Server started, waiting for requests...");