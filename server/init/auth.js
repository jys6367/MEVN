const passport = require('passport');
const path = require('path');
const fs = require("fs");

const User = require("../model/user");

function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function initAllStrategies() {
    fs.readdirSync(path.join(__dirname, "..", "auth", "strategies"))
        .forEach(file => {
            require(`../auth/strategies/${file}`)()
        });
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