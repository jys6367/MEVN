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
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(4);
var autoIncrement = __webpack_require__(5);

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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 6 */
/***/ (function(module, exports) {


module.exports = {
    host: "localhost",
    port: 3000,
    db: {
        url: "mongodb://localhost/blog"
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(2);
var LocalStrategy = __webpack_require__(20).Strategy;

var User = __webpack_require__(3);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(0).Router();

var Board = __webpack_require__(23);

router.get("/getList", function (req, res) {
    Board.find({}, res.return);
});

router.get("/:id", function (req, res) {
    Board.findOne({ _id: req.params.id }, res.return);
});

router.delete("/:id", function (req, res, next) {
    Board.deleteOne({ _id: req.params.id }, res.return);
});

router.put("/:id", function (req, res) {
    Board.update({ _id: req.params.id }, req.body, res.return);
});

router.post("/insert", function (req, res) {
    var board = new Board(Object.assign({}, req.body, {
        regDate: new Date()
    }));

    board.save(res.return);
});

module.exports = router;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(0).Router();

router.get("/ok", function (req, res, next) {
    res.ok();
});

router.get("/forbidden", function (req, res) {
    res.forbidden();
});

router.get("/error", function (req, res) {
    res.error({ message: "error!" });
});

module.exports = router;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(2);
var path = __webpack_require__(1);
var router = __webpack_require__(0).Router();

var User = __webpack_require__(3);
var upload = __webpack_require__(24);

router.post('/join', function (req, res) {
    new User(Object.assign({}, req.body, {
        state: "REG",
        userType: "NORMAL",
        regDt: new Date()
    })).save(res.return);
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
        !user && res.error({ message: "password" });

        req.logIn(user, function (err) {
            err && res.error(err);
            res.json({ user: user.forClient() });
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
    res.json(req.user || req.user.forClient() && "none");
});

module.exports = router;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {



var config = __webpack_require__(6);
var app = __webpack_require__(13)();

app.listen(config.port, config.host, function () {
    console.log("SERVER INIT");
});

console.log('Server listening on ' + config.host + ':' + config.port);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _require = __webpack_require__(14),
    Builder = _require.Builder,
    Nuxt = _require.Nuxt;

var session = __webpack_require__(15);
var bodyParser = __webpack_require__(16);
var express = __webpack_require__(0);
var serveStatic = __webpack_require__(17);
var path = __webpack_require__(1);

function initMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/public", serveStatic(path.join(__dirname, "..", "public")));
}

function initSession(app) {
    app.use(session({ secret: "!XV^&_H$VJ$CHS&" }));
}

function initAuth(app) {
    __webpack_require__(18)(app);
}

function initRouter(app) {
    __webpack_require__(21)(app);
}

function initNuxt(app) {
    var nuxtConfig = __webpack_require__(29);
    nuxtConfig.dev = !("development" === 'production');

    var nuxt = new Nuxt(nuxtConfig);

    if (nuxtConfig.dev) {
        var builder = new Builder(nuxt);
        builder.build();
    }

    app.use(nuxt.render);
}

function initMongoose() {
    __webpack_require__(30)();
}

module.exports = function () {
    var app = express();

    initMongoose();
    initMiddleware(app);
    initSession(app);
    initAuth(app);
    initRouter(app);
    initNuxt(app);

    return app;
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("serve-static");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var passport = __webpack_require__(2);
var path = __webpack_require__(1);
var fs = __webpack_require__(7);

var User = __webpack_require__(3);

function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function initAllStrategies() {
    fs.readdirSync(path.join(__dirname, "..", "auth", "strategies")).forEach(function (file) {
        __webpack_require__(19)("./" + file)();
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
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./local": 8,
	"./local.js": 8
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
webpackContext.id = 19;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(0);
var path = __webpack_require__(1);
var fs = __webpack_require__(7);

function useApiAll(app) {
    fs.readdirSync(path.join(__dirname, "..", "..", "api")).forEach(function (file) {
        var moduleName = file.substr(0, file.indexOf(".js"));

        console.log("app.use(\"/" + moduleName + "\"), require(\"../../api/" + file + "\")");
        app.use("/" + moduleName, __webpack_require__(22)("./" + file));
    });
}

function errorHandle(app) {

    __webpack_require__(26)(app);
}

function loggingRequest(app) {
    __webpack_require__(27).requestLog(app);
}

function initMyMiddleware(app) {
    app.use(__webpack_require__(28).response);
}

function getApp() {
    var app = express();
    loggingRequest(app);
    initMyMiddleware(app);
    useApiAll(app);
    errorHandle(app);

    return app;
}

module.exports = function (app) {
    return app.use("/api", getApp());
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init\\api"))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./board": 9,
	"./board.js": 9,
	"./test": 10,
	"./test.js": 10,
	"./user": 11,
	"./user.js": 11
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
webpackContext.id = 22;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(4);
var autoIncrement = __webpack_require__(5);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


var multer = __webpack_require__(25);
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
/* 25 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 26 */
/***/ (function(module, exports) {



module.exports = function (app) {

    app.use(function (err, req, res, next) {
        if (!err) next();

        console.log("************************************************************************");
        console.log("  500 / " + err.message + "  ");

        res.Error();
    });

    app.use(function (req, res) {
        console.log("************************************************************************");
        console.log("      404 NOT_FOUND          ");

        res.sendStatus(404);
    });
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {
    requestLog: function requestLog(app) {
        app.use("/", function (req, res, next) {
            console.log("************************************************************************");
            console.log("user : " + JSON.stringify(req.user) + " ");
            console.log("query : " + JSON.stringify(req.query) + " & params : " + JSON.stringify(req.params) + " & body : " + JSON.stringify(req.body));
            console.log("method : " + req.method + " & url : " + req.url);
            console.log("time : " + new Date());

            next();
        });
    }
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {



module.exports = {
    response: function response(req, res, next) {
        res.ok = function () {
            return res.sendStatus(200);
        };
        res.notFound = function () {
            return res.sendStatus(404);
        };
        res.error = function (err) {
            return err && err.message ? res.status(500).json(err.message) : res.sendStatus(500);
        };
        res.forbidden = function () {
            return res.sendStatus(403);
        };
        res.return = function (err, result) {
            return err ? res.error(err) : res.json(result);
        };

        next();
    }
};

/***/ }),
/* 29 */
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
    loading: { color: '#060580' },
    build: {
        vendor: ['axios', '~/plugins/vuetify.js', 'vue2-medium-editor'],
        extractCSS: true
    }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(4);
var autoIncrement = __webpack_require__(5);
var config = __webpack_require__(6);

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

/***/ })
/******/ ]);
//# sourceMappingURL=main.map