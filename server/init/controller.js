const express = require('express');
const path = require('path');
const fs = require('fs');
const _ = require("lodash")

const Result = require("../result")
const methodTypes = ["get", "post", "all", "put", "delete"];

function Controller() {

    this.services = {};
    this.models = {};
    requireAllModel.call(this.services);
    requireAllService.call(this.models);

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

    function getParam(req, res) {
        let basicParam = {
            req,
            res,
            body: req.body,
            params: req.params,
            currentUser: req.user,
            ...Result(res)
        }
        let customParam = {
            ...this.services,
            ...this.models,
        }

        return {
            basicParam, customParam, resultTypes
        }
    }

    function getDispatch(type, methodName) {
        return (req, res) => {

            let {basicParam, customParam, resultTypes} = getParam.call(this, req, res);

            try {
                console.log(`*****${type}.${methodName}() 호출*****`)
                this[type][methodName].call(this, basicParam, customParam)
                console.log(`*****${type}.${methodName}() 종료******`)
            } catch (e) {
                resultTypes.Error(e);
            }
        }
    }
}


function requireAllModel() {
    require("./model")(this);
}

function requireAllService() {
    require("./service")(this);
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

    router.all("/", (req, res) => {
        Result(res).NotFound()
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

    app.use("/", (req, res) => {
        Result(res).NotFound()
    })

    return app;
}

module.exports = function (app) {
    app.use("/api", getApp())
}
