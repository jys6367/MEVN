import mongoose from 'mongoose';

import Board from "./board";

function createSchema(database) {
    database.Board = Board;
}

function connect(app) {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/board");

    var db = mongoose.connection;
    db.on('error', (e)=> console.log(e));

    db.once('open', function () {
        console.log("Connected to mongo server");
    });

    let database = {};
    createSchema(database);
    app.set('database', database);
}

export default {
    init(app) {
        connect(app);
    }
};