const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require("../../model/user");

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd'
        },
        function (email, pwd, done) {
            User.findOne({email, pwd}, function (err, user) {
                console.log('err', err)
                console.log('user', user)
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect.'});
                }

                return done(null, user);
            });
        }
    ))
}