const express = require('express');
const path = require("path");
const fs = require("fs");

function useApiAll(app) {
    fs.readdirSync(path.join(__dirname,"..", "..", "api"))
        .forEach(file => {
            let moduleName = file.substr(0, file.indexOf(".js"));

            console.log(`app.use("/${moduleName}"), require("../../api/${file}")`);
            app.use(`/${moduleName}`, require(`../../api/${file}`));
        })
}

function errorHandle(app) {

    require("./errorhandler")(app);
}

function loggingRequest(app) {
    require("./apiLog").requestLog(app);
}

function initMyMiddleware(app) {
    app.use(require("./middleware").response);
}

function getApp() {
    let app = express();
    loggingRequest(app);
    initMyMiddleware(app);
    useApiAll(app);
    errorHandle(app);

    return app;
}

module.exports = app => app.use("/api", getApp())

