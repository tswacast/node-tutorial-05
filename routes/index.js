// routes/index.js

exports.init = function (app) {
    app.get("/", function (req, res) {
        res.render("index", { title: 'Message Board' });
    });
};
