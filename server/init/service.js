const fs = require('fs')
const path = require('path')

function Service() {
    requireModel.call(this);
}

function requireModel() {
    require("./model")(this)
}

module.exports = function(_this){
    fs.readdirSync(path.join(__dirname, '..', "service"))
        .forEach(injectService)

    function injectService(serviceName){
        let _Service = require(`../service/${serviceName}`);
        _Service.prototype = new Service();

        _this[_Service.name] = new _Service();
    }
}
