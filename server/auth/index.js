const passport = require('passport');

const utils = require("../utils");
const User = require("../model/user");

function initAllStrategies() {
    utils.getFiles(`${__dirname}/strategies/`)
        .forEach(file => {
            require(`${__dirname}/strategies/${file}`)()
        })
}

function initSerialize() {
    passport.serializeUser(function(user, done) {
        done(null, {
            _id : user._id,
            email: user.email,
            name: user.name
        });
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
    initAllStrategies();
    initSerialize();
}