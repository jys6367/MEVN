const passport = require('passport');

const utils = require("../utils");
const User = require("../model/user");

function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function initAllStrategies() {
    utils.getFiles(`${__dirname}/strategies/`)
        .forEach(file => {
            require(`${__dirname}/strategies/${file}`)()
        })
}

function initSerialize() {

    // done({}, user) => req.session.passport.user = user
    passport.serializeUser(function (user, done) {
        done(null, user.forClient());
    });

    passport.deserializeUser(function (user, done) {
        User.findById(user._id, done);
    });
}

module.exports = function (app) {
    initPassport(app);
    initAllStrategies();
    initSerialize();
}