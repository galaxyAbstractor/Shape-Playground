/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Store {

    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key];
    }
    setItem(key, value) {
        this.store[key] = value;
    }
}

const store = new Store();

/* harmony default export */ __webpack_exports__["a"] = store;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Modifier {
    constructor() {
        this.keep = true;
    }

    init() {

    }

    setShape(shape) {
        this.shape = shape;
    }
}

/* harmony default export */ __webpack_exports__["a"] = Modifier;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Shape {
    constructor(ctx, x, y, red, green, blue, modifiers) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.size = 0;
        this.keep = true;
        this.opacity = 0;
        this.maxSize = 40;
        this.speed = 0.005;
        this.modifiers = modifiers;
        this.fadesOut = true;

        let self = this;
        this.modifiers.forEach(function (modifier) {
            modifier.setShape(self);
            modifier.init();
        })
    }

    draw() {
        this.fade();

        this.modifiers.forEach(function (modifier) {
            modifier.apply();
        })
    }
    fade() {
        if (this.size <= 10) {
            this.opacity = (this.size / 10);
        }

        if (this.fadesOut && this.size >= this.maxSize - 10) {
            this.opacity = 1 - ((this.size - (this.maxSize - 10)) / 10);
        }
    }
    shouldKeep() {
        return this.modifiers.reduce(function (acc, cv) {
            return cv.keep || acc;
        }, false);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Shape;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Spawner__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store__ = __webpack_require__(0);



class Playground {
    constructor(el, options) {
        this.el = el;
        this.ctx = el[0].getContext("2d");
        this.width = el.width();
        this.height = el.height();
        this.x = 0;
        this.shapes = [];

        __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("x", 0);
        __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("y", 0);
        __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("width", this.width);
        __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("height", this.height);

        let self = this;
        el.on("mousemove", function (e) {

            let rect = self.el[0].getBoundingClientRect();
            let scrollTop = document.documentElement.scrollTop?
                document.documentElement.scrollTop:document.body.scrollTop;
            let scrollLeft = document.documentElement.scrollLeft?
                document.documentElement.scrollLeft:document.body.scrollLeft;
            let elementLeft = rect.left+scrollLeft;
            let elementTop = rect.top+scrollTop;

            let x = e.pageX-elementLeft;
            let y = e.pageY-elementTop;

            __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("x",  20 - (40 * (x / self.width)));
            __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("y",  20 - (40 * (y / self.height)));
        });


        let default_options = {
            background: {
                color: "#ff0000"
            },
            shapes: {
                max: 30
            }
        };

        this.options = Object.assign({}, default_options, options);

        window.requestAnimationFrame(this.loop.bind(this));

        $(window).on("resize", function () {
            self.el.attr("height", self.el.height());
            self.el.attr("width", self.el.width());
            self.width = self.el.width();
            self.height = self.el.height();
            __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("width", this.width);
            __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].setItem("height", this.height);
        });

        el.attr("height", self.el.height());
        el.attr("width", self.el.width());
        self.width = self.el.width();
        self.height = self.el.height();
    }
    drawBackground() {
        this.ctx.fillStyle = this.options.background.color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawShapes() {
        this.shapes.forEach((shape) => {
            shape.draw();
        })
    }

    draw() {
        this.drawBackground();
        this.drawShapes();
    }

    spawnShape() {
        if(Math.random() > 0.8) {
            this.shapes.push(__WEBPACK_IMPORTED_MODULE_0__Spawner__["a" /* default */].spawnShape(this.ctx, this.width, this.height));
        }
    }

    killShapes() {
        this.shapes = this.shapes.filter((shape) => {
            if(Math.random() > 0.8) {
                return shape.shouldKeep();
            } else {
                return true;
            }
        })
    }

    loop() {
        if(this.shapes.length < this.options.shapes.max) {
            this.spawnShape();
        }

        this.draw();
        this.killShapes();

        window.requestAnimationFrame(this.loop.bind(this));

    }

}

/* harmony default export */ __webpack_exports__["a"] = Playground;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_Circle__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shapes_Square__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shapes_Triangle__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modifiers_Grows__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modifiers_MovesX__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modifiers_MovesY__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modifiers_Rave__ = __webpack_require__(8);









let availableShapes = [__WEBPACK_IMPORTED_MODULE_0__shapes_Circle__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__shapes_Square__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__shapes_Triangle__["a" /* default */]];
let availableModifiers = [__WEBPACK_IMPORTED_MODULE_3__modifiers_Grows__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__modifiers_MovesX__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__modifiers_MovesY__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__modifiers_Rave__["a" /* default */]];

class Spawner {
    static spawnShape(ctx, width, height) {

        let mods = Array.from(availableModifiers);
        let modifiers = mods.splice(Math.floor(Math.random() * mods.length), 1);

        for (let i = 0; i < availableModifiers.length; i++) {
            if(Math.random() > 0.9) {
                let modifier = mods.splice(Math.floor(Math.random() * mods.length), 1);
                modifiers = modifiers.concat(modifier);
            }
        }

        modifiers = modifiers.map(function (modifier) {
            return new modifier();
        });

        return new availableShapes[Math.floor(Math.random() * availableShapes.length)](
            ctx,
            Math.floor(Math.random() * width),
            Math.floor(Math.random() * height),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            modifiers
        )

    }
}

/* harmony default export */ __webpack_exports__["a"] = Spawner;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modifier__ = __webpack_require__(1);


class Grows extends __WEBPACK_IMPORTED_MODULE_0__Modifier__["a" /* default */] {
    constructor() {
        super();
        this.inital = true;
    }
    apply() {
        if(this.inital) {
            this.shape.size = 0;
            this.inital = false;
        }

        if (this.shape.size < this.shape.maxSize) {
            this.shape.size += (this.shape.maxSize * this.shape.speed);
        }

        if (this.shape.size > this.shape.maxSize) {
            this.keep = false;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = Grows;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Store__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Modifier__ = __webpack_require__(1);



class MovesX extends __WEBPACK_IMPORTED_MODULE_1__Modifier__["a" /* default */] {
    constructor() {
        super();
    }

    init() {
        this.shape.fadesOut = false;
        this.direction = Math.random() < 0.5 ? -1 : 1;

        if(this.direction === 1) {
            this.shape.x = -50;
        } else {
            this.shape.x = __WEBPACK_IMPORTED_MODULE_0__Store__["a" /* default */].getItem("width") + 50;
        }

    }
    apply() {
        this.shape.x += 3 * this.direction;

        if (this.direction === 1 && this.shape.x > __WEBPACK_IMPORTED_MODULE_0__Store__["a" /* default */].getItem("width") + 50) {
            this.keep = false;
        } else if(this.shape.x < -50) {
            this.keep = false;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = MovesX;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Store__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Modifier__ = __webpack_require__(1);



class MovesY extends __WEBPACK_IMPORTED_MODULE_1__Modifier__["a" /* default */] {
    constructor() {
        super();
    }

    init() {
        this.shape.fadesOut = false;
        this.shape.y = 0;
        this.direction = Math.random() < 0.5 ? -1 : 1;

        if(this.direction === 1) {
            this.shape.y = -50;
        } else {
            this.shape.y = __WEBPACK_IMPORTED_MODULE_0__Store__["a" /* default */].getItem("height") + 50;
        }

    }
    apply() {
        this.shape.y += 3 * this.direction;

        if (this.direction === 1 && this.shape.y > __WEBPACK_IMPORTED_MODULE_0__Store__["a" /* default */].getItem("height") + 50) {
            this.keep = false;
        } else if(this.shape.y < -50) {
            this.keep = false;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = MovesY;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modifier__ = __webpack_require__(1);


class Rave extends __WEBPACK_IMPORTED_MODULE_0__Modifier__["a" /* default */] {
    constructor() {
        super();
        this.keep = false;
    }
    apply() {
        this.shape.red = Math.random() * 255;
        this.shape.green = Math.random() * 255;
        this.shape.blue = Math.random() * 255;
    }
}

/* harmony default export */ __webpack_exports__["a"] = Rave;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store__ = __webpack_require__(0);



class Circle extends __WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* default */] {
    draw() {
        super.draw();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';

        let x = this.x + __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].getItem("x");
        let y = this.y + __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].getItem("y");

        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size, 0, Math.PI * 2, true);
        this.ctx.stroke();

    }
}

/* harmony default export */ __webpack_exports__["a"] = Circle;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store__ = __webpack_require__(0);



class Square extends __WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* default */] {
    draw() {
        super.draw();

        let x = this.x + __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].getItem("x");
        let y = this.y + __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].getItem("y");

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';
        this.ctx.strokeRect(x - (this.size/2), y - (this.size/2), this.size, this.size);
    }
}

/* harmony default export */ __webpack_exports__["a"] = Square;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Store__ = __webpack_require__(0);



class Triangle extends __WEBPACK_IMPORTED_MODULE_0__Shape__["a" /* default */] {
    constructor() {
        super(...arguments);

        this.maxSize = 60;
    }
    draw() {
        super.draw();

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.opacity + ')';

        let x = this.x + __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].getItem("x");
        let y = this.y + __WEBPACK_IMPORTED_MODULE_1__Store__["a" /* default */].getItem("y");

        this.ctx.beginPath();
        this.ctx.moveTo(x, y - (this.size / 2));
        this.ctx.lineTo(x - (this.size / 2), y + (this.size / 2));
        this.ctx.lineTo(x + (this.size / 2), y + (this.size / 2));
        this.ctx.lineTo(x, y - (this.size / 2));
        this.ctx.stroke();

    }
}

/* harmony default export */ __webpack_exports__["a"] = Triangle;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Playground__ = __webpack_require__(3);


$(document).ready(function () {
    let options = {
      background: {
          color: "#393F4C"
      }
    };
    let playground = new __WEBPACK_IMPORTED_MODULE_0__Playground__["a" /* default */]($("#playground"), options);
});

/***/ })
/******/ ]);