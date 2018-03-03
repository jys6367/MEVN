const passport = require('passport');
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

/* GET user by ID. */
router.post('/login', function (req, res) {
    console.log(req.body);
    passport.authenticate('local', function (err, user, info) {
        console.log('err', err)
        console.log('user', user)
        console.log('info', info)
        if (err || !user) return res.json(err || info)

        req.logIn(user, function (err) {
            if (err) return res.json(err);

            return res.json("Success");
        });
    })(req, res);
});

module.exports = router;