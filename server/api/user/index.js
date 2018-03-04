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
    passport.authenticate('local', function (err, user, info) {
        if (err) return console.log("*****************/api/user/login\r\n", err);
        if (!user) return res.json({message: info});

        req.logIn(user, function (err) {
            if (err) return res.json(err);

            return res.json({user: user.forClient()});
        });
    })(req, res);
});

router.get("/logout", function (req, res) {
    res.json(req.logout())
})

/* GET user by ID. */
router.all('/currentUser', function (req, res) {
    res.json(req.isAuthenticated() ? {user:req.user.forClient()} : undefined);
});

/* GET user by ID. */
router.get("/test", function (req, res) {
    if (req.isAuthenticated()) return res.json({data: "true"});
    res.json(req.user);
});

module.exports = router;