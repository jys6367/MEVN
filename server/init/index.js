const {Builder, Nuxt} = require("nuxt");
const session = require("express-session");
const bodyParser = require("body-parser");
const express = require('express');
const serveStatic = require('serve-static');
const path = require("path");

const config = require("../config");


function initMiddleware(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use("/public", serveStatic(path.join(__dirname, "..", "public")));
}

function initSession(app) {
    app.use(session({secret: "!XV^&_H$VJ$CHS&"}))
}

function initAuth(app) {
    require("../auth")(app);
}

function initRouter(app) {
    require("./controller")(app);
}

function initNuxt(app) {
    let nuxtConfig = require('../../nuxt.config.js')
    nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

    const nuxt = new Nuxt(nuxtConfig)

    if (nuxtConfig.dev) {
        const builder = new Builder(nuxt)
        builder.build()
    }

    app.use(nuxt.render)
}

module.exports = function () {
    let app = express();

    initMiddleware(app);
    initSession(app);
    initAuth(app);
    initRouter(app);
    initNuxt(app);

    return app;
}