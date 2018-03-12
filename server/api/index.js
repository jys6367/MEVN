const express = require('express')

const utils = require("../utils");

function useApiAll(app) {
    utils.getFiles(__dirname)
        .filter(file => file !== "index.js")
        .forEach(file => {
            app.use(`/${file}`, require(`./${file}`));
        })
}

function routeNone(app) {
    app.use(function (req, res) {
        // 404
        res.json("404_ERROR")
    })
}

function getApp() {
    var app = express();
    useApiAll(app);
    routeNone(app);

    return app;
}

module.exports = function (app) {
    app.use("/api", getApp())
}
