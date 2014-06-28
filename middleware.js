// middleware.js
var serverLogger = require("./serverLogger");

exports.logRequests = function (req, res, next) {
    serverLogger.info("Request received: %s - %s ", req.method, req.url);
    next();
};

exports.pageNotFound = function (req, res, next) {
  res.send("<html><head><title>Page Not Found</title></head><body><h1>404: Page Not Found!</h1><p>Oops! The page you are looking for could not be found.</p></body></html>", 404);
};

exports.errorPage = function (err, req, res, next) {
   serverLogger.error(err);
   res.send("<html><head><title>Error Page</title></head><body><h1>Error occurred!</h1><p>" + err + "</p><p>" + err.stack + "</p></body></html>",500);
};