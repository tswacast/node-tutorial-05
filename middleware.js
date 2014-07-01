// middleware.js
var serverLogger = require("./serverLogger");

exports.logRequests = function (req, res, next) {
    serverLogger.info("Request received: %s - %s ", req.method, req.url);
    next();
};

exports.pageNotFound = function (req, res, next) {
    res.status = 404;
    res.render('404', { title: '404: Not Found' });
};

exports.errorPage = function (err, req, res, next) {
    serverLogger.error(err);
    res.status = 500;
    res.render('error', { title: 'Error!', err: err });
};