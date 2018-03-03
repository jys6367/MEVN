const {Builder, Nuxt} = require("nuxt");
const session = require("express-session");
const bodyParser = require("body-parser");
const express = require('express');
const config = require("../config");

function initMiddleware(app) {
    app.set("port", config.port);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}

function initSession(app) {
    app.use(session({secret: "keyboard cat"}))
}

function initAuth(app) {
    require("../auth")(app);
}

function initRouter(app) {
    require("../api")(app);
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