require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(0);

var utils = __webpack_require__(10);

function useApiAll(app) {
    utils.getFiles(__dirname).filter(function (file) {
        return file !== "index.js";
    }).forEach(function (file) {
        app.use("/" + file, __webpack_require__(23)("./" + file));
    });
}

function routeNone(app) {
    app.use(function (req, res) {
        // 404
        res.json("404_ERROR");
    });
}

function getApp() {
    var app = express();
    useApiAll(app);
    routeNone(app);

    return app;
}

module.exports = function (app) {
    app.use("/api", getApp());
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\api"))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(0).Router();

var Board = __webpack_require__(24);

router.get("/getList", function (req, res) {
    Board.find({}, function (err, data) {
        res.json(data);
    });
});

router.get("/:id", function (req, res) {
    Board.findOne({ _id: req.params.id }, function (err, data) {
        res.json(data);
    });
});

router.delete("/:id", function (req, res) {
    Board.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json("Success");
        }
    });
});

router.put("/:id", function (req, res) {
    Board.update({ _id: req.params.id }, req.body, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json(NoLogin);
            res.json("Success");
        }
    });
});

router.post("/insert", function (req, res) {
    console.log('board', req.body);
    var board = new Board(Object.assign({}, req.body, {
        regDate: new Date()
    }));
    board.save(function (err) {
        if (err) {
            console.log(err.message);
            res.json("error");
        } else {
            res.json("success");
        }
    });
});

module.exports = router;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(7);
var path = __webpack_require__(9);
var router = __webpack_require__(0).Router();

var User = __webpack_require__(8);
var upload = __webpack_require__(25);

router.post('/join', function (req, res, next) {
    new User(Object.assign({}, req.body, {
        state: "REG",
        userType: "NORMAL",
        regDt: new Date()
    })).save(function (err) {
        res.json({
            status: !err,
            message: err && err.message
        });
    });
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
        if (err) return console.log("*****************/api/user/login\r\n", err);
        if (!user) return res.json({ message: info });

        req.logIn(user, function (err) {
            if (err) return res.json(err);

            return res.json({ user: user.forClient() });
        });
    })(req, res);
});

router.all("/logout", function (req, res) {
    res.json(req.logout());
});

/* GET user by ID. */
router.all('/currentUser', function (req, res) {
    res.json(req.isAuthenticated() ? { user: req.user.forClient() } : undefined);
});

/* GET user by ID. */
router.get("/test", function (req, res) {
    if (req.isAuthenticated()) return res.json({ data: "true" });
    res.json(req.user);
});

module.exports = router;

/***/ }),
/* 4 */
/***/ (function(module, exports) {


module.exports = {
    host: "localhost",
    port: 3000,
    db: {
        url: "mongodb://localhost/blog"
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(5);
var autoIncrement = __webpack_require__(6);

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    pwd: {
        type: String,
        require: true
    },
    state: {
        type: String,
        default: "REG"
    },
    name: {
        type: String,
        require: true
    },
    birthDay: {
        type: Date,
        require: true
    },
    userType: {
        type: String,
        default: "NORMAL"
    },
    photo: {
        type: String
    },
    regDt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(autoIncrement.plugin, {
    model: "User",
    startAt: 1,
    field: '_id'
});

// User.findById(_id, (err,result)=>{})
UserSchema.static("findById", function (_id, callback) {
    return this.findOne({ _id: _id }, callback);
});

// result = new User().myMethod(arg1, arg2);
UserSchema.method("forClient", function () {
    return {
        _id: this._id,
        email: this.email,
        name: this.name,
        birthDay: this.birthDay,
        photo: this.photo,
        userType: this.userType,
        regDt: this.regDt
    };
});

var User = mongoose.model("User", UserSchema);

module.exports = User;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = {
    getFiles: function getFiles(path) {
        return __webpack_require__(20).readdirSync(path);
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(7);
var LocalStrategy = __webpack_require__(22).Strategy;

var User = __webpack_require__(8);

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd'
    }, function (email, pwd, done) {
        User.findOne({ email: email, pwd: pwd }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect.' });
            }

            return done(null, user);
        });
    }));
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {



var config = __webpack_require__(4);
var db = __webpack_require__(13)();
var app = __webpack_require__(14)();

app.listen(config.port, config.host, function () {
    console.log("SERVER INIT");
    console.log(123);
});

console.log('Server listening on ' + config.host + ':' + config.port);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(5);
var autoIncrement = __webpack_require__(6);
var config = __webpack_require__(4);

function init(db) {
    mongoose.connect(config.db.url);
    db = mongoose.connection;

    autoIncrement.initialize(db);

    db.on('error', function (e) {
        return console.log(e);
    });

    db.once('open', function () {
        console.log("Connected to mongo server");
    });
}

module.exports = function () {
    var db = void 0;

    mongoose.Promise = global.Promise;

    mongoose.connection.readyState === 1 || init(db);

    return db;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _require = __webpack_require__(15),
    Builder = _require.Builder,
    Nuxt = _require.Nuxt;

var session = __webpack_require__(16);
var bodyParser = __webpack_require__(17);
var express = __webpack_require__(0);
var serveStatic = __webpack_require__(18);
var path = __webpack_require__(9);

var config = __webpack_require__(4);

function initMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/public", serveStatic(path.join(__dirname, "..", "public")));
}

function initSession(app) {
    app.use(session({ secret: "!XV^&_H$VJ$CHS&" }));
}

function initAuth(app) {
    __webpack_require__(19)(app);
}

function initRouter(app) {
    __webpack_require__(1)(app);
}

function initNuxt(app) {
    var nuxtConfig = __webpack_require__(27);
    nuxtConfig.dev = !("development" === 'production');

    var nuxt = new Nuxt(nuxtConfig);

    if (nuxtConfig.dev) {
        var builder = new Builder(nuxt);
        builder.build();
    }

    app.use(nuxt.render);
}

module.exports = function () {
    var app = express();

    initMiddleware(app);
    initSession(app);
    initAuth(app);
    initRouter(app);
    initNuxt(app);

    return app;
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("serve-static");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var passport = __webpack_require__(7);

var utils = __webpack_require__(10);
var User = __webpack_require__(8);

function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function initAllStrategies() {
    utils.getFiles(__dirname + "/strategies/").forEach(function (file) {
        __webpack_require__(21)("./" + file)();
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
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\auth"))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./local": 11,
	"./local.js": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 21;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 1,
	"./board": 2,
	"./board/": 2,
	"./board/index": 2,
	"./board/index.js": 2,
	"./index": 1,
	"./index.js": 1,
	"./user": 3,
	"./user/": 3,
	"./user/index": 3,
	"./user/index.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 23;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(5);
var autoIncrement = __webpack_require__(6);

var BoardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        default: Date.now
    }
});

BoardSchema.plugin(autoIncrement.plugin, {
    model: "Board",
    startAt: 1,
    field: '_id'
});

var Board = mongoose.model("Board", BoardSchema);

// export default {
//     Board
// }
module.exports = Board;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


var multer = __webpack_require__(26);
// const upload = multer({dest: "../../uploads"})


var storage = multer.diskStorage({
    destination: function destination(req, res, callback) {
        callback(null, './server/public/uploads');
    },
    filename: function filename(req, file, callback) {
        //callback(null, file.originalname + Date.now());

        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname, extension);
        callback(null, '' + basename + Date.now() + extension);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fies: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

module.exports = upload;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {
    srcDir: "client/",
    /*
    ** Headers of the page
    */
    head: {
        title: 'Raccoon',
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
        script: [{ src: '//cdn.ckeditor.com/4.6.2/full/ckeditor.js' }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
    },
    router: {
        middleware: "checkAuth"
    },
    plugins: ['~/plugins/vuetify.js'],
    css: ['~/assets/style/app.styl'],
    // css: ['~/assets/css/main.css'],
    loading: { color: '#060580' },
    build: {
        vendor: ['axios', '~/plugins/vuetify.js', 'vue2-medium-editor'],
        extractCSS: true
    }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map