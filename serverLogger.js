// serverLogger.js - A wrapper around logging functionality
// This module exists to allow the logger to be easily replaced if desired.

var winston = require("winston");
var fs = require("fs");

var logdir = "./logs";
var logfile = "server.log";

// Function to log informational message
exports.info = function() {
    winston.info.apply(this, arguments);
};

// Function to log warning message
exports.warn = function() {
    winston.warn.apply(this, arguments);
};

// Function to log error message
exports.error = function() {
    winston.error.apply(this, arguments);
};

// Function to log debug message
exports.debug = function() {
    winston.debug.apply(this, arguments);
};

// Add the log file to the logger.  This function exists so that the
// the logger can function until the logfile can be created.  If the
// logfile is never available, the logger will continue to write to the console.
function addLogfile() {
    winston.add(winston.transports.File, { filename: logdir + "/" + logfile });
}

// Check to make sure the logfile can be written to.  These file operations
// are done synchronously to allow the logging system to spin up before
// any attempt to use it are made.
try {
    // Look for the /logs directory
    var stats = fs.statSync(logdir);

    // The path for the log directory was found.  Make sure it is a directory
    if (!stats.isDirectory()) {
        exports.error("Could not create logfile.  The path %s exists but is not a directory.", logdir);
    } else {
        addLogfile();
    }
} catch(err) {
    // The directory could not be found attempting to create
    try {
        fs.mkdirSync(logdir);
        // The log directory exists.  Tell the logger to start writting the logfile
        addLogfile();
    } catch (err) {
        exports.error("Could not create logs directory: %s", logdir);
    }
}
