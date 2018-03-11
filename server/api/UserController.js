const passport = require('passport');
const path = require('path');
const router = require('express').Router()

const upload = require("../utils/upload")

module.exports = function UserController() {

    this.post.join = function ({Error, Success, body}, {User}) {
        new User({
            ...body,
            state: "REG",
            userType: "NORMAL",
            regDt: new Date()
        }).save(err => {
            if (err) return Error(err);

            return Success()
        });
    }

    this.post.login = function ({req, res}) {

        passport.authenticate('local', (err, user, info) => {
            if (err) return console.log("*****************/api/user/login\r\n", err);
            if (!user) return res.json({message: info});

            req.logIn(user, (err) => {
                if (err) return res.json(err);

                return res.json({user: user.forClient()});
            });
        })(req, res);

    }


    this.all.logout = function ({req, res}) {
        res.json(req.logout())
    }

    this.all.currentUser = function ({req, res, currentUser}) {
        res.json(req.isAuthenticated() ? {user: currentUser.forClient()} : undefined);
    }

    this.get.test = function ({currentUser}) {
        return currentUser;
    }

}