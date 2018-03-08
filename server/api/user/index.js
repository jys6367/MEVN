const passport = require('passport');
const path = require('path');
const router = require('express').Router()
const multer  = require('multer')
// const upload = multer({dest: "../../uploads"})


var storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, './server/public/uploads');
    },
    filename: (req, file, callback) => {
        //callback(null, file.originalname + Date.now());

        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, `${basename}${Date.now()}${extension}`);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fies: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

const User = require("../../model/user")

// router.post('/join', function (req, res, next) {
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
// });

router.route('/join').post(upload.array('photo', 1), function (req, res, next) {
    console.log(req.files[0])
    console.dir(req.body)

    res.json({file: req.files[0], body: req.body})
});


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