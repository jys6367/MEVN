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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


module.exports = {
    host: "localhost",
    port: 3000,
    db: {
        url: "mongodb://localhost/blog"
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = {
    getFiles: function getFiles(path) {
        return __webpack_require__(17).readdirSync(path);
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(1);
var autoIncrement = __webpack_require__(2);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(4);
var LocalStrategy = __webpack_require__(19).Strategy;

var User = __webpack_require__(6);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {



var config = __webpack_require__(0);
var db = __webpack_require__(9)();
var app = __webpack_require__(10)();

app.listen(config.port, config.host, function () {
    console.log("SERVER INIT");
    console.log(123);
});

console.log('Server listening on ' + config.host + ':' + config.port);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(1);
var autoIncrement = __webpack_require__(2);
var config = __webpack_require__(0);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _require = __webpack_require__(11),
    Builder = _require.Builder,
    Nuxt = _require.Nuxt;

var session = __webpack_require__(12);
var bodyParser = __webpack_require__(13);
var express = __webpack_require__(3);
var serveStatic = __webpack_require__(14);
var path = __webpack_require__(15);

var config = __webpack_require__(0);

function initMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/public", serveStatic(path.join(__dirname, "..", "public")));
}

function initSession(app) {
    app.use(session({ secret: "!XV^&_H$VJ$CHS&" }));
}

function initAuth(app) {
    __webpack_require__(16)(app);
}

function initRouter(app) {
    __webpack_require__(25)(app);
}

function initNuxt(app) {
    var nuxtConfig = __webpack_require__(24);
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
/* 11 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("serve-static");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var passport = __webpack_require__(4);

var utils = __webpack_require__(5);
var User = __webpack_require__(6);

function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function initAllStrategies() {
    utils.getFiles(__dirname + "/strategies/").forEach(function (file) {
        __webpack_require__(18)("./" + file)();
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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./local": 7,
	"./local.js": 7
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
webpackContext.id = 18;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports) {



module.exports = function TestService() {};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function TestController() {
    this.post.test = function (param) {
        return {
            param: param,
            currentUser: this.currentUser
        };
    };

    this.get.test = function (param) {
        console.log("testcontroller. test 함수 실행");

        return {
            param: param,
            currentUser: this.currentUser
        };
    };
};

/***/ }),
/* 24 */
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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(3);
var path = __webpack_require__(15);
var fs = __webpack_require__(17);

var utils = __webpack_require__(5);

var methodTypes = ["get", "post", "all", "put", "delete"];

function Controller() {

    this.TestService = __webpack_require__(22);

    // this._init = function () {
    //     let router = new express();
    //
    //     var TestController = require("./testController");
    //     var test = new TestController();
    //
    // }

    this.post = {};
    this.get = {};
    this.put = {};
    this.delete = {};
    this.all = {};

    this.getInfo = function (type) {
        var _this = this;

        var methodNameArr = Object.keys(this[type]);

        return methodNameArr.map(function (methodName) {
            return {
                route: getRoute(methodName),
                dispatch: getDispatch.call(_this, type, methodName)
            };
        });
    };

    function getRoute(methodName) {
        if (methodName.startsWith("_")) return '/:' + methodName.slice(1);

        return '/' + methodName;
    }

    function init(req, res) {
        this.req = req;
        this.res = res;

        this.body = req.body;
        this.params = req.params;

        this.currentUser = req.user;
    }

    function getDispatch(type, methodName) {
        var _this2 = this;

        return function (req, res) {
            init.call(_this2, req, res);

            if (typeof _this2[type][methodName] !== 'function') return res.json('');
            // res.json(Error404)

            res.json(_this2[type][methodName](123));
        };
    }
}

function getController(_Controller) {
    _Controller.prototype = new Controller();
    return new _Controller();
}

function getRouter(_Controller) {
    var router = express.Router();

    var controller = getController(_Controller);

    methodTypes.forEach(function (type) {
        var methodInfoArr = controller.getInfo(type);

        methodInfoArr.forEach(function (info) {
            router[type](info.route, info.dispatch);
        });
    });

    return router;
}

function getAllControllerInfo() {
    return fs.readdirSync(path.join(__dirname, '..', 'api')).filter(function (controllerName) {
        return controllerName.toUpperCase().endsWith("CONTROLLER.JS");
    }).map(function (controllerName) {
        return {
            route: '/' + controllerName.substr(0, controllerName.toUpperCase().indexOf("CONTROLLER")),
            Controller: __webpack_require__(29)("./" + controllerName)
        };
    });
}

function getApp() {
    var app = express();

    var controllerInfoArr = getAllControllerInfo();

    controllerInfoArr.forEach(function (info) {
        app.use(info.route, getRouter(info.Controller));
    });

    return app;
}

module.exports = function (app) {
    app.use("/api", getApp());
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(3).Router();

var Board = __webpack_require__(30);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(4);
var path = __webpack_require__(15);
var router = __webpack_require__(3).Router();

var User = __webpack_require__(6);
var upload = __webpack_require__(31);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./TestController": 23,
	"./TestController.js": 23,
	"./board": 27,
	"./board/": 27,
	"./board/index": 27,
	"./board/index.js": 27,
	"./user": 28,
	"./user/": 28,
	"./user/index": 28,
	"./user/index.js": 28
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
webpackContext.id = 29;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(1);
var autoIncrement = __webpack_require__(2);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


var multer = __webpack_require__(32);
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
/* 32 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map