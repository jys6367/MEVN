const passport = require('passport');
const path = require('path');
const router = require('express').Router();

const User = require("../model/user");
const upload = require("../utils/upload");

router.post('/join', function (req, res) {
    new User({
        ...req.body,
        state: "REG",
        userType: "NORMAL",
        regDt: new Date()
    }).save(res.return);
});

// router.post('/join', upload.single('photo'), function (req, res, next) {
//
//     new User({
//         ...req.body,
//         state: "REG",
//         userType: "NORMAL",
//         regDt: new Date()
//     }).save(err => {
//         res.json({
//             status: !err,
//             message: err && err.message
//         });
//     });
//
//     res.json({file: req.files[0], body: req.body})
// });


router.post('/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        err && res.error(err);
        !user && res.error({message : "password"})

        req.logIn(user, err => {
            err && res.error(err);
            res.json({user: user.forClient()});
        });
    })(req, res);
});

router.all("/logout", function (req, res) {
    res.json(req.logout())
})

/* GET user by ID. */
router.all('/currentUser', function (req, res) {
    res.json(req.isAuthenticated() ? {user: req.user.forClient()} : undefined);
});

/* GET user by ID. */
router.get("/test", function (req, res) {
    res.json(req.user || req.user.forClient() && "none");
});

module.exports = router;