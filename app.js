// app.js

var http = require("http");
var serverLogger = require("./serverLogger");
var express = require("express");
var app = express();
var favicon = require("serve-favicon");
var middleware = require("./middleware");
var routes = require('./routes/');

// Set up the view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Set up the express app's middleware to run before routes
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(middleware.logRequests);

// Define routes
routes.init(app);

// Set up post route middleware
app.use(middleware.pageNotFound);
app.use(middleware.errorPage);

// Create the server and specify express as the request handler
var server = http.createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP);
serverLogger.info("Server started, waiting for requests...");