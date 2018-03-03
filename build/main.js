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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

__webpack_require__(10).readdirSync(__dirname).forEach(function (file) {
    if (file == 'index.js') return;

    var route = __webpack_require__(11)("./" + file);

    app.use('/' + file, route.default);
});

app.use("/", function (req, res) {
    res.json("fail");
});

/* harmony default export */ __webpack_exports__["default"] = (app);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server\\api"))

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get("/getList", function (req, res) {
    var database = req.app.get("database");
    database.Board.find({}, function (err, data) {
        res.json(data);
    });
});

router.get("/:id", function (req, res) {
    console.log("Router");
    var database = req.app.get("database");
    database.Board.findOne({ _id: req.params.id }, function (err, data) {
        res.json(data);
    });
});

router.delete("/:id", function (req, res) {
    var _req$app$get = req.app.get("database"),
        Board = _req$app$get.Board;

    Board.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json("Success");
        }
    });
});

router.put("/:id", function (req, res) {
    var _req$app$get2 = req.app.get("database"),
        Board = _req$app$get2.Board;

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

    var _req$app$get3 = req.app.get("database"),
        Board = _req$app$get3.Board;

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

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.post('/join', function (req, res, next) {
    var _req$app$get = req.app.get("database"),
        User = _req$app$get.User;

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

/* GET user by ID. */
router.post('/login', function (req, res, next) {
    var _req$app$get2 = req.app.get("database"),
        User = _req$app$get2.User;

    User.find({ email: req.body.email, pwd: req.body.pwd }, function (err, result) {
        res.json(err || result);
    });
});

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment__);



function createSchema() {
    var db = {};

    __webpack_require__(10).readdirSync(__dirname).forEach(function (file) {
        if (file == 'index.js') return;
        var model = __webpack_require__(18)("./" + file).default;
        db = Object.assign({}, db, model);
    });

    return db;
}

function connect(app) {
    __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = global.Promise;
    __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect("mongodb://localhost/blog");

    var db = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection;

    __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment___default.a.initialize(db);

    db.on('error', function (e) {
        return console.log(e);
    });

    db.once('open', function () {
        console.log("Connected to mongo server");
    });

    app.set('database', createSchema());
}

/* harmony default export */ __webpack_exports__["default"] = ({
    init: function init(app) {
        connect(app);
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server\\model"))

/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__service__);








var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);

app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());
// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_3__api__["default"]);

// Import and Set Nuxt.js options
var config = __webpack_require__(14);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
    var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
    builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host, function () {
    console.log("SERVER INIT");
    __WEBPACK_IMPORTED_MODULE_4__model__["default"].init(app);
});
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 1,
	"./board": 3,
	"./board/": 3,
	"./board/index": 3,
	"./board/index.js": 3,
	"./board/service": 6,
	"./board/service.js": 6,
	"./index": 1,
	"./index.js": 1,
	"./user": 4,
	"./user/": 4,
	"./user/index": 4,
	"./user/index.js": 4
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
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("mongoose-auto-increment");

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment__);



var BoardSchema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
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

BoardSchema.plugin(__WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment___default.a.plugin, {
    model: "Board",
    startAt: 1,
    field: '_id'
});

var Board = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model("Board", BoardSchema);

// export default {
//     Board
// }
/* harmony default export */ __webpack_exports__["default"] = ({
    Board: Board

});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment__);



var UserSchema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
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

UserSchema.plugin(__WEBPACK_IMPORTED_MODULE_1_mongoose_auto_increment___default.a.plugin, {
    model: "User",
    startAt: 1,
    field: '_id'
});

var User = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model("User", UserSchema);
// export default User;

/* harmony default export */ __webpack_exports__["default"] = ({
    User: User
});

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./": 5,
	"./board": 15,
	"./board/": 15,
	"./board/index": 15,
	"./board/index.js": 15,
	"./index": 5,
	"./index.js": 5,
	"./user": 16,
	"./user/": 16,
	"./user/index": 16,
	"./user/index.js": 16
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



module.exports = {
    a: 1
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map