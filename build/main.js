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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(9);
var autoIncrement = __webpack_require__(10);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(9);
var autoIncrement = __webpack_require__(10);

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

var User = mongoose.model("User", UserSchema);
// export default User;

module.exports = User;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(9);
var autoIncrement = __webpack_require__(10);
var config = __webpack_require__(8);

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
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(1);

var utils = __webpack_require__(22);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(1).Router();

var Board = __webpack_require__(2);

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
            res.json("Success");
        }
    });
});

router.post("/insert", function (req, res) {
    var body = req.body;
    var board = new Board();
    board.title = body.title;
    board.content = body.content;
    board.save(function (err) {
        if (err) {
            res.json("error");
        } else {
            res.json("success");
        }
    });
});

module.exports = router;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(14);
var LocalStrategy = __webpack_require__(24).Strategy;
var router = __webpack_require__(1).Router();

var User = __webpack_require__(3);

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

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

/* GET user by ID. */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports) {


module.exports = {
    host: "localhost",
    port: 3000,
    db: {
        url: "mongodb://localhost/blog"
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 15 */
/***/ (function(module, exports) {



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {



var config = __webpack_require__(8);
var db = __webpack_require__(4)();
var app = __webpack_require__(20)();

app.listen(config.port, config.host, function () {
    console.log("SERVER INIT");
});

console.log('Server listening on ' + config.host + ':' + config.port);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {
    srcDir: "client/",
    /*
    ** Headers of the page
    */
    head: {
        title: 'Raccoon',
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
    },
    plugins: ['~/plugins/vuetify.js'],
    css: ['~/assets/style/app.styl'],
    // css: ['~/assets/css/main.css'],
    loading: { color: '#060580' },
    build: {
        vendor: ['axios', '~/plugins/vuetify.js'],
        extractCSS: true
    }
};

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(17),
    Builder = _require.Builder,
    Nuxt = _require.Nuxt;

var session = __webpack_require__(11);
var bodyParser = __webpack_require__(12);
var express = __webpack_require__(1);
var config = __webpack_require__(8);

function initMiddleware(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

function initSession(app) {
    app.use(session({ secret: "keyboard cat" }));
}

function initAuth(app) {
    __webpack_require__(21)(app);
}

function initRouter(app) {
    __webpack_require__(5)(app);
}

function initNuxt(app) {
    var nuxtConfig = __webpack_require__(18);
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

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(14);

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = {
    getFiles: function getFiles(path) {
        return __webpack_require__(13).readdirSync(path);
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 5,
	"./board": 6,
	"./board/": 6,
	"./board/index": 6,
	"./board/index.js": 6,
	"./board/service": 15,
	"./board/service.js": 15,
	"./index": 5,
	"./index.js": 5,
	"./user": 7,
	"./user/": 7,
	"./user/index": 7,
	"./user/index.js": 7
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
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map