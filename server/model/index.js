import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

function createSchema() {
    let db = {};

    require("fs").readdirSync(__dirname).forEach(file => {
        if (file == 'index.js') return;
        let model = require(`./${file}`).default;
        db = {...db, ...model};
    })

    return db;
}

function connect(app) {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blog");

    let db = mongoose.connection;

    autoIncrement.initialize(db);

    db.on('error', (e) => console.log(e));

    db.once('open', function () {
        console.log("Connected to mongo server");
    });

    app.set('database', createSchema());
}

export default {
    init(app) {
        connect(app);
    }
};