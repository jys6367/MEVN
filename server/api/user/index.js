import { Router } from 'express'

const router = Router()

router.post('/join', function (req, res, next) {
    let {User} = req.app.get("database");

    new User({
        ...req.body,
        state: "REG",
        userType : "NORMAL",
        regDt : new Date()
    }).save(err=>{
        res.json({
            status : !err,
            message : err && err.message
        });
    });
});

/* GET user by ID. */
router.post('/login', function (req, res, next) {
    let {User} = req.app.get("database");
    User.find({email:req.body.email, pwd:req.body.pwd}, (err, result)=>{
        res.json(err || result)
    })
});

export default router;