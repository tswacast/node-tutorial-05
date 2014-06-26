// serverLogger.js - A wrapper around logging functionality
// This module exists to allow the logger to be easily replaced if desired.


(function (serverLogger) {
var winston = require("winston");
    
    // Function to log informational message
    module.exports.info = function() {
        winston.info.apply(this, arguments);
    };
})(module.exports);
