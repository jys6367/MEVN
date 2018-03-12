const express = require('express');
const path = require('path');
const fs = require('fs');

const utils = require("../utils");

const methodTypes = ["get", "post", "all", "put", "delete"];

function Controller() {

    this.TestService = require("../service/TestService");

    // this._init = function () {
    //     let router = new express();
    //
    //     var TestController = require("./testController");
    //     var test = new TestController();
    //
    // }

    this.post = {};
    this.get = {};
    this.put = {};
    this.delete = {};
    this.all = {};

    this.getInfo = function (type) {
        let methodNameArr = Object.keys(this[type]);

        return methodNameArr.map(methodName => ({
            route: getRoute(methodName),
            dispatch: getDispatch.call(this, type, methodName)
        }));
    }

    function getRoute(methodName) {
        if (methodName.startsWith("_"))
            return `/:${methodName.slice(1)}`

        return `/${methodName}`;
    }

    function init(req, res) {
        this.req = req;
        this.res = res;

        this.body = req.body;
        this.params = req.params;

        this.currentUser = req.user;
    }

    function getDispatch(type, methodName) {
        return (req, res) => {
            init.call(this, req, res);

            if (typeof(this[type][methodName]) !== 'function')
                return res.json('')
            // res.json(Error404)

            res.json(this[type][methodName](123));
        }
    }
}

function getController(_Controller) {
    _Controller.prototype = new Controller();
    return new _Controller();
}

function getRouter(_Controller) {
    let router = express.Router()

    let controller = getController(_Controller)

    methodTypes.forEach(type => {
        let methodInfoArr = controller.getInfo(type)

        methodInfoArr.forEach(info => {
            router[type](info.route, info.dispatch);
        })
    })

    return router;
}

function getAllControllerInfo() {
    return fs.readdirSync(path.join(__dirname, '..', 'api'))
        .filter(controllerName => controllerName.toUpperCase().endsWith("CONTROLLER.JS"))
        .map(controllerName => ({
            route: `/${controllerName.substr(0, controllerName.toUpperCase().indexOf("CONTROLLER"))}`,
            Controller: require(`../api/${controllerName}`)
        }))
}

function getApp() {
    let app = express();

    let controllerInfoArr = getAllControllerInfo();

    controllerInfoArr.forEach(info => {
        app.use(info.route, getRouter(info.Controller))
    })

    return app;
}

module.exports = function (app) {
    app.use("/api", getApp())
}
