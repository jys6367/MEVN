const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router()

const User = require("../../model/user")

router.post('/join', function (req, res, next) {
    new User({
        ...req.body,
        state: "REG",
        userType: "NORMAL",
        regDt: new Date()
    }).save(err => {
        res.json({
            status: !err,
            message: err && err.message
        });
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
))

/* GET user by ID. */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

module.exports = router;