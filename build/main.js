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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(10);
var autoIncrement = __webpack_require__(11);

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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(10);
var autoIncrement = __webpack_require__(11);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(10);
var autoIncrement = __webpack_require__(11);
var config = __webpack_require__(9);

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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(2).Router();

var Board = __webpack_require__(3);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(5);
var path = __webpack_require__(1);
var router = __webpack_require__(2).Router();

var User = __webpack_require__(0);
var upload = __webpack_require__(18);

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
/* 9 */
/***/ (function(module, exports) {


module.exports = {
    host: "localhost",
    port: 3000,
    db: {
        url: "mongodb://localhost/blog"
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(5);
var LocalStrategy = __webpack_require__(28).Strategy;

var User = __webpack_require__(0);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var fs = __webpack_require__(6);
var path = __webpack_require__(1);

module.exports = function (_this) {
    fs.readdirSync(path.join(__dirname, '..', "model")).forEach(injectModel);

    function injectModel(fileName) {
        var Model = __webpack_require__(32)("./" + fileName);
        _this[Model.modelName] = Model;
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 14 */
/***/ (function(module, exports) {



module.exports = function TestService() {

    this.test = function () {
        console.log("TestService.test() 시작");
        var user = new this.User();
        return user.forClient();
    };
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function BoardController() {

    this.get.getList = function (_ref, _ref2) {
        var Json = _ref.Json;
        var Board = _ref2.Board;

        Board.find({}, function (err, data) {
            return Json(data);
        });
    };

    this.get._id = function (_ref3, _ref4) {
        var Json = _ref3.Json,
            params = _ref3.params;
        var Board = _ref4.Board;

        Board.findOne({ _id: params.id }, function (err, data) {
            return Json(data);
        });
    };

    this.delete._id = function (_ref5, _ref6) {
        var Json = _ref5.Json,
            Success = _ref5.Success;
        var Board = _ref6.Board;

        Board.deleteOne({ _id: this.params.id }, function (err) {
            if (err) return Error(err);

            return Success();
        });
    };

    this.put._id = function (_ref7, _ref8) {
        var Error = _ref7.Error,
            Success = _ref7.Success,
            params = _ref7.params,
            body = _ref7.body;
        var Board = _ref8.Board;

        Board.update({ _id: params.id }, body, function (err) {
            if (err) return Error(err);

            Success();
        });
    };

    this.post.insert = function (_ref9, _ref10) {
        var Success = _ref9.Success,
            Error = _ref9.Error,
            body = _ref9.body;
        var Board = _ref10.Board;

        var board = new Board(Object.assign({}, body, {
            regDate: new Date()
        }));

        board.save(function (err) {
            if (err) return Error(err);

            Success();
        });
    };
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function TestController() {

    this.post.test = function (_ref) {
        var param = _ref.param,
            currentUser = _ref.currentUser;

        return {
            param: param,
            currentUser: currentUser
        };
    };

    this.get.test = function (_ref2, _ref3) {
        var res = _ref2.res,
            Json = _ref2.Json,
            param = _ref2.param,
            currentUser = _ref2.currentUser;
        var TestService = _ref3.TestService;

        console.log("testcontroller. test 함수 실행");

        var result = TestService.test();
        res.json(123);
        res.json(123);
        res.json(123);
        res.json(123);
        return Json({
            param: param,
            result: result,
            currentUser: currentUser
        });
    };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(5);
var path = __webpack_require__(1);
var router = __webpack_require__(2).Router();

var upload = __webpack_require__(18);

module.exports = function UserController() {

    this.post.join = function (_ref, _ref2) {
        var Error = _ref.Error,
            Success = _ref.Success,
            body = _ref.body;
        var User = _ref2.User;

        new User(Object.assign({}, body, {
            state: "REG",
            userType: "NORMAL",
            regDt: new Date()
        })).save(function (err) {
            if (err) return Error(err);

            return Success();
        });
    };

    this.post.login = function (_ref3) {
        var req = _ref3.req,
            res = _ref3.res;


        passport.authenticate('local', function (err, user, info) {
            if (err) return console.log("*****************/api/user/login\r\n", err);
            if (!user) return res.json({ message: info });

            req.logIn(user, function (err) {
                if (err) return res.json(err);

                return res.json({ user: user.forClient() });
            });
        })(req, res);
    };

    this.all.logout = function (_ref4) {
        var req = _ref4.req,
            res = _ref4.res;

        res.json(req.logout());
    };

    this.all.currentUser = function (_ref5) {
        var req = _ref5.req,
            res = _ref5.res,
            currentUser = _ref5.currentUser;

        res.json(req.isAuthenticated() ? { user: currentUser.forClient() } : undefined);
    };

    this.get.test = function (_ref6) {
        var currentUser = _ref6.currentUser;

        return currentUser;
    };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var multer = __webpack_require__(36);
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {



var config = __webpack_require__(9);
var db = __webpack_require__(4)();
var app = __webpack_require__(20)();

app.listen(config.port, config.host, function () {
    console.log("SERVER INIT");
});

console.log('Server listening on ' + config.host + ':' + config.port);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _require = __webpack_require__(21),
    Builder = _require.Builder,
    Nuxt = _require.Nuxt;

var session = __webpack_require__(22);
var bodyParser = __webpack_require__(23);
var express = __webpack_require__(2);
var serveStatic = __webpack_require__(24);
var path = __webpack_require__(1);

var config = __webpack_require__(9);

function initMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/public", serveStatic(path.join(__dirname, "..", "public")));
}

function initSession(app) {
    app.use(session({ secret: "!XV^&_H$VJ$CHS&" }));
}

function initAuth(app) {
    __webpack_require__(25)(app);
}

function initRouter(app) {
    __webpack_require__(29)(app);
}

function initNuxt(app) {
    var nuxtConfig = __webpack_require__(37);
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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("serve-static");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var passport = __webpack_require__(5);

var utils = __webpack_require__(26);
var User = __webpack_require__(0);

function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

function initAllStrategies() {
    utils.getFiles(__dirname + "/strategies/").forEach(function (file) {
        __webpack_require__(27)("./" + file)();
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = {
    getFiles: function getFiles(path) {
        return __webpack_require__(6).readdirSync(path);
    }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./local": 12,
	"./local.js": 12
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
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(2);
var path = __webpack_require__(1);
var fs = __webpack_require__(6);
var _ = __webpack_require__(30);

var Result = __webpack_require__(31);
var methodTypes = ["get", "post", "all", "put", "delete"];

function Controller() {

    this.services = {};
    this.models = {};
    requireAllModel.call(this.services);
    requireAllService.call(this.models);

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

    function getParam(req, res) {
        var resultTypes = Result(res);
        var basicParam = Object.assign({
            req: req,
            res: res,
            body: req.body,
            params: req.params,
            currentUser: req.user
        }, resultTypes);
        var customParam = Object.assign({}, this.services, this.models);

        return {
            basicParam: basicParam, customParam: customParam, resultTypes: resultTypes
        };
    }

    function getDispatch(type, methodName) {
        var _this2 = this;

        return function (req, res) {
            var _getParam$call = getParam.call(_this2, req, res),
                basicParam = _getParam$call.basicParam,
                customParam = _getParam$call.customParam,
                resultTypes = _getParam$call.resultTypes;

            try {
                console.log('*****' + type + '.' + methodName + '() \uD638\uCD9C*****');
                _this2[type][methodName].call(_this2, basicParam, customParam);
                console.log('*****' + type + '.' + methodName + '() \uC885\uB8CC******');
            } catch (e) {
                resultTypes.Error(e);
            }
        };
    }
}

function requireAllModel() {
    __webpack_require__(13)(this);
}

function requireAllService() {
    __webpack_require__(33)(this);
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

    router.all("/", function (req, res) {
        Result(res).NotFound();
    });

    return router;
}

function getAllControllerInfo() {
    return fs.readdirSync(path.join(__dirname, '..', 'api')).filter(function (controllerName) {
        return controllerName.toUpperCase().endsWith("CONTROLLER.JS");
    }).map(function (controllerName) {
        return {
            route: '/' + controllerName.substr(0, controllerName.toUpperCase().indexOf("CONTROLLER")),
            Controller: __webpack_require__(35)("./" + controllerName)
        };
    });
}

function getApp() {
    var app = express();

    var controllerInfoArr = getAllControllerInfo();

    controllerInfoArr.forEach(function (info) {
        app.use(info.route, getRouter(info.Controller));
    });

    app.use("/", function (req, res) {
        Result(res).NotFound();
    });

    return app;
}

module.exports = function (app) {
    app.use("/api", getApp());
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (res) {
    var end = false;
    return {
        isEnd: function isEnd() {
            return end;
        },
        Success: function Success() {
            console.log("Result.Success 호출");
            if (!end) {
                console.log("SUCCESS");
                res.json("SUCCESS");
                end = true;
            }
        },
        Json: function Json(data) {
            console.log("Result.Json 호출");
            if (!end) {
                console.log("Json", data);
                res.json(data);
                end = true;
            }
        },
        NotFound: function NotFound() {
            console.log("Result.Notfound 호출");
            if (!end) {
                console.log("notFound");
                res.json("notFound");
                end = true;
            }
        },
        Error: function Error(e) {
            console.log("Result.Error 호출");
            if (!end) {
                console.log("Error", e);
                res.json("ERROR");
                end = true;
            }
        }
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 4,
	"./board": 3,
	"./board/": 3,
	"./board/index": 3,
	"./board/index.js": 3,
	"./index": 4,
	"./index.js": 4,
	"./user": 0,
	"./user/": 0,
	"./user/index": 0,
	"./user/index.js": 0
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
webpackContext.id = 32;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var fs = __webpack_require__(6);
var path = __webpack_require__(1);

function Service() {
    requireModel.call(this);
}

function requireModel() {
    __webpack_require__(13)(this);
}

module.exports = function (_this) {
    fs.readdirSync(path.join(__dirname, '..', "service")).forEach(injectService);

    function injectService(serviceName) {
        var _Service = __webpack_require__(34)("./" + serviceName);
        _Service.prototype = new Service();

        _this[_Service.name] = new _Service();
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, "server\\init"))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./TestService": 14,
	"./TestService.js": 14
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
webpackContext.id = 34;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./BoardController": 15,
	"./BoardController.js": 15,
	"./TestController": 16,
	"./TestController.js": 16,
	"./UserController": 17,
	"./UserController.js": 17,
	"./board": 7,
	"./board/": 7,
	"./board/index": 7,
	"./board/index.js": 7,
	"./user": 8,
	"./user/": 8,
	"./user/index": 8,
	"./user/index.js": 8
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
webpackContext.id = 35;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 37 */
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