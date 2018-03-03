const mongoose  = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require("../config");
//
// function createSchema() {
//     let db = {};
//
//     require("fs").readdirSync(__dirname).forEach(file => {
//         if (file == 'index.js') return;
//         let model = require(`./${file}`);
//         db = {...db, ...model};
//     })
//
//     return db;
// }

function init(db) {
    mongoose.connect(config.db.url);
    db = mongoose.connection;

    autoIncrement.initialize(db);

    db.on('error', (e) => console.log(e));

    db.once('open', function () {
        console.log("Connected to mongo server");
    });
}

module.exports = function () {
    let db;

    mongoose.Promise = global.Promise;

    mongoose.connection.readyState === 1 || init(db);

    return db;
};