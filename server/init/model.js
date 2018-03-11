const fs = require('fs');
const path = require('path');


module.exports = function (_this) {
    fs.readdirSync(path.join(__dirname, '..', "model"))
        .forEach(injectModel)

    function injectModel(fileName) {
        let Model = require(`../model/${fileName}`);
        _this[Model.modelName] = Model;
    }
}