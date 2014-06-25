// logger.js - A wrapper around logging functionality
// This module exists to allow the logger to be easily replaced if desired.

var winston = require("winston");
    
var winstonLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

(function(serverLogger) {
    
    var fs = require("fs");
    
    var logdir = "./logs";
    var logfile = "server.log";

    // Add the log file to the logger.  This function exists so that the
    // the logger can function until the logfile can be created.  If the
    // logfile is never available, the logger will continue to write to the console.
    function addLogfile() {
        winstonLogger.add(winston.transports.File, { filename: logdir + "/" + logfile });
    }
    
    // Function to log informational message
    serverLogger.info = function() {
        winstonLogger.info.apply(this, arguments);
    };
    
    // Function to log warning message
    serverLogger.warn = function() {
        winstonLogger.warn.apply(this, arguments);
    };
    
    // Function to log error message
    serverLogger.error = function() {
        winstonLogger.error.apply(this, arguments);
    };
    
    // Function to log debug message
    serverLogger.debug = function() {
        winstonLogger.debug.apply(this, arguments);
    };
    
    // Check to make sure the logfile can be written to.  These file operations
    // are done synchronously to allow the logging system to spin up before
    // any attempt to use it are made.
    try {
        var stats = fs.statSync(logdir);

        // The path for the log directory was found.  Make sure it is a directory
        if (!stats.isDirectory()) {
            serverLogger.error("Could not create logfile.  The path %s exists but is not a directory.", logdir);
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
            serverLogger.error("Could not create logs directory: %s", logdir);
        }
    }
})(module.exports);