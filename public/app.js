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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/color.ts":
/*!**********************!*\
  !*** ./src/color.ts ***!
  \**********************/
/*! exports provided: EColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EColor", function() { return EColor; });
var EColor;
(function (EColor) {
    EColor["Red"] = "#CC361F";
    EColor["Yellow"] = "#DBDE4B";
    EColor["Orange"] = "#EC7B34";
    EColor["Green"] = "#5FD441";
    EColor["Pink"] = "#DA4FAF";
    EColor["Blue"] = "#4AAAD7";
})(EColor || (EColor = {}));



/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.canvasWidth = 0;
    Config.canvasHeight = 0;
    Config.lineWidth = 4;
    Config.fps = 80;
    /**
     * Defines how many degrees a line should turn when turning left/right
     */
    Config.angleModifier = 2;
    /**
     * Defines the speed
     */
    Config.pixelsPerSecond = 100;
    Config.scoreBoardWith = 150;
    /**
     * the width of holes
     */
    Config.holeSize = 10;
    /**
     * Defines the frequency with that holes appear. the lower, the less holes appear.
     * Has to be greater than 0.
     */
    Config.holeFrequency = 10;
    return Config;
}());



/***/ }),

/***/ "./src/event-handler.ts":
/*!******************************!*\
  !*** ./src/event-handler.ts ***!
  \******************************/
/*! exports provided: EventHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventHandler", function() { return EventHandler; });
var EventHandler = /** @class */ (function () {
    function EventHandler() {
    }
    /**
     * Registers a new event listener and adds it to the stack.
     *
     * @param {string} name of the function. should be unique. otherwise there will be conflicts
     * @param {Node} node that registers the event. Usually something like document or element
     * @param {string} eventName of the DOM Event that triggers the action.
     * For example keydown, keyup, mousedown, etc.
     * @param callback that will eventually be executed.
     */
    EventHandler.addEventListener = function (name, node, eventName, callback) {
        var callbackListener = function (event) {
            return callback(event);
        };
        node.addEventListener(eventName, callbackListener);
        this.eventCallbacks.set(name, { node: node, eventName: eventName, callback: callbackListener });
    };
    /**
     * Removes an existing event listener
     *
     * @param {string} name of the event
     */
    EventHandler.removeEventListener = function (name) {
        var entry = this.eventCallbacks.get(name);
        if (entry) {
            entry.node.removeEventListener(entry.eventName, entry.callback);
            this.eventCallbacks.delete(name);
        }
    };
    /**
     * Registers a one time event that will automatically deregister itself after being executed once
     *
     * @param {Node} node that registers the event. Usually something like document or element
     * @param {string} eventName of the DOM Event that triggers the action.
     * For example keydown, keyup, mousedown, etc.
     * @param callback that will eventually be executed.
     */
    EventHandler.oneTimeEventListener = function (node, eventName, callback) {
        var callbackListener = function (event) {
            node.removeEventListener(eventName, callbackListener);
            return callback(event);
        };
        node.addEventListener(eventName, callbackListener);
    };
    /**
     * Stack that holds events until they are eventually deregistered
     */
    EventHandler.eventCallbacks = new Map();
    return EventHandler;
}());



/***/ }),

/***/ "./src/firework/config.ts":
/*!********************************!*\
  !*** ./src/firework/config.ts ***!
  \********************************/
/*! exports provided: FireworkConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FireworkConfig", function() { return FireworkConfig; });
var FireworkConfig = /** @class */ (function () {
    function FireworkConfig() {
    }
    FireworkConfig.minStrength = 1.5;
    FireworkConfig.maxStrength = 7;
    FireworkConfig.minTrails = 10;
    FireworkConfig.maxTrails = 30;
    FireworkConfig.gravity = 5e-2;
    FireworkConfig.airResistance = 1e-3;
    FireworkConfig.numberOfStars = 150;
    FireworkConfig.fireworkLifeTime = 150;
    FireworkConfig.trailLength = 150;
    FireworkConfig.delay = 0.5;
    return FireworkConfig;
}());



/***/ }),

/***/ "./src/firework/firework-service.ts":
/*!******************************************!*\
  !*** ./src/firework/firework-service.ts ***!
  \******************************************/
/*! exports provided: FireworkService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FireworkService", function() { return FireworkService; });
/* harmony import */ var _firework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firework */ "./src/firework/firework.ts");
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./star */ "./src/firework/star.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/firework/config.ts");




var FireworkService = /** @class */ (function () {
    function FireworkService(drawingContext, withStars) {
        this.drawingContext = drawingContext;
        this.withStars = withStars;
        this.stars = [];
        this.isRunning = false;
        this.mainWithThis = this.main.bind(this);
        this.firework1 = new _firework__WEBPACK_IMPORTED_MODULE_0__["Firework"](this.drawingContext);
        this.firework2 = new _firework__WEBPACK_IMPORTED_MODULE_0__["Firework"](this.drawingContext);
        this.firework2.life = -_config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].fireworkLifeTime - _config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].delay;
        if (this.withStars) {
            this.createStars();
        }
    }
    FireworkService.prototype.start = function () {
        this.saveDrawingSurface();
        this.isRunning = true;
        this.main();
    };
    FireworkService.prototype.stop = function () {
        this.isRunning = false;
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
        }
    };
    FireworkService.prototype.createStars = function () {
        for (var i = 0; i < _config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].numberOfStars; i++) {
            this.stars.push(new _star__WEBPACK_IMPORTED_MODULE_1__["Star"](this.drawingContext));
        }
    };
    FireworkService.prototype.main = function () {
        if (this.isRunning) {
            this.restoreDrawingSurface();
        }
        else {
            return;
        }
        this.stars.forEach(function (star) {
            star.draw();
        });
        this.firework1.update();
        this.firework2.update();
        if (this.firework1.life === _config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].fireworkLifeTime * _config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].delay) {
            this.firework2 = new _firework__WEBPACK_IMPORTED_MODULE_0__["Firework"](this.drawingContext);
        }
        if (this.firework2.life === _config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].fireworkLifeTime * _config__WEBPACK_IMPORTED_MODULE_3__["FireworkConfig"].delay) {
            this.firework1 = new _firework__WEBPACK_IMPORTED_MODULE_0__["Firework"](this.drawingContext);
        }
        if (this.isRunning) {
            this.animationId = window.requestAnimationFrame(this.mainWithThis);
        }
    };
    FireworkService.prototype.saveDrawingSurface = function () {
        this.previousState = this.drawingContext.getImageData(0, 0, _config__WEBPACK_IMPORTED_MODULE_2__["Config"].canvasWidth, _config__WEBPACK_IMPORTED_MODULE_2__["Config"].canvasHeight);
    };
    FireworkService.prototype.restoreDrawingSurface = function () {
        if (this.previousState) {
            this.drawingContext.putImageData(this.previousState, 0, 0);
        }
    };
    return FireworkService;
}());



/***/ }),

/***/ "./src/firework/firework.ts":
/*!**********************************!*\
  !*** ./src/firework/firework.ts ***!
  \**********************************/
/*! exports provided: Firework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Firework", function() { return Firework; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./src/firework/particle.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/firework/config.ts");



var Firework = /** @class */ (function () {
    function Firework(drawingContext) {
        this.drawingContext = drawingContext;
        this.x = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth * (Math.random() * 0.8 + 0.1); // from 0.1-0.9 widths
        this.y = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight * (Math.random() * 0.8 + 0.1); // from 0.1-0.9 heights
        this.strength = Math.random() * (_config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].maxStrength - _config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].minStrength)
            + _config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].minStrength;
        this.color = Math.trunc(Math.random() * 255) + "," + Math.trunc(Math.random() * 255) + ","
            + ("" + Math.trunc(Math.random() * 255));
        this.life = 0;
        this.particles = [];
        var n = ~~(Math.random() * (_config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].maxTrails - _config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].minTrails)) + _config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].minTrails;
        var ay = _config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].gravity;
        for (var i = n; i--;) {
            var ax = _config__WEBPACK_IMPORTED_MODULE_2__["FireworkConfig"].airResistance;
            var angle = i * Math.PI * 2 / n;
            if (angle < Math.PI) {
                ax *= -1;
            }
            var vx = this.strength * Math.sin(angle);
            var vy = this.strength * Math.cos(angle);
            this.particles.push(new _particle__WEBPACK_IMPORTED_MODULE_1__["Particle"](drawingContext, this.x, this.y, vx, vy, ax, ay, this.color));
        }
    }
    Firework.prototype.update = function () {
        this.life++;
        if (this.life < 0) {
            return; // allows life to be delayed
        }
        for (var i = this.particles.length; i--;) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    };
    return Firework;
}());



/***/ }),

/***/ "./src/firework/particle.ts":
/*!**********************************!*\
  !*** ./src/firework/particle.ts ***!
  \**********************************/
/*! exports provided: Particle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/firework/config.ts");

var Particle = /** @class */ (function () {
    function Particle(drawingContext, x, y, vx, vy, ax, ay, color) {
        this.drawingContext = drawingContext;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.color = color;
        this.lifeTime = _config__WEBPACK_IMPORTED_MODULE_0__["FireworkConfig"].fireworkLifeTime;
        this.radius = 3;
        this.path = [];
    }
    Particle.prototype.update = function () {
        this.lifeTime--;
        // add point to path but if full, remove a point first
        if (this.path.length >= _config__WEBPACK_IMPORTED_MODULE_0__["FireworkConfig"].trailLength)
            this.path.shift();
        this.path.push([this.x, this.y]);
        // update speed n position n stuff
        this.vy += this.ay;
        this.vx += this.ax;
        this.x += this.vx;
        this.y += this.vy;
    };
    Particle.prototype.draw = function () {
        var opacity = Math.trunc(this.lifeTime * 100 / _config__WEBPACK_IMPORTED_MODULE_0__["FireworkConfig"].fireworkLifeTime) / 100;
        // tail
        this.drawingContext.fillStyle = "rgba(" + this.color + "," + opacity * 0.4 + ")";
        if (this.lifeTime > _config__WEBPACK_IMPORTED_MODULE_0__["FireworkConfig"].fireworkLifeTime * 0.95) {
            this.drawingContext.fillStyle = '#fff';
        }
        this.drawingContext.lineWidth = 40;
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(this.x - this.radius, this.y);
        this.drawingContext.lineTo(this.path[0][0], this.path[0][1]);
        this.drawingContext.lineTo(this.x + this.radius, this.y);
        this.drawingContext.closePath();
        this.drawingContext.fill();
        // main dot
        this.drawingContext.fillStyle = "rgba(" + this.color + "," + opacity + ")";
        if (this.lifeTime > _config__WEBPACK_IMPORTED_MODULE_0__["FireworkConfig"].fireworkLifeTime * 0.95) {
            this.drawingContext.fillStyle = '#fff';
        }
        this.drawingContext.beginPath();
        this.drawingContext.arc(Math.trunc(this.x), Math.trunc(this.y), this.radius, 0, Math.PI * 2);
        this.drawingContext.fill();
        this.drawingContext.closePath();
    };
    return Particle;
}());



/***/ }),

/***/ "./src/firework/star.ts":
/*!******************************!*\
  !*** ./src/firework/star.ts ***!
  \******************************/
/*! exports provided: Star */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Star", function() { return Star; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");

var Star = /** @class */ (function () {
    function Star(drawingContext) {
        this.drawingContext = drawingContext;
        this.maxStarRadius = 3;
        this.flashingFactor = 0.4;
        this.x = Math.random() * _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth;
        this.y = Math.random() * _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight;
        this.r = Math.random() * this.maxStarRadius;
        this.b = Math.trunc(Math.random() * 100) / 100;
    }
    Star.prototype.draw = function () {
        this.b += this.flashingFactor * (Math.random() - .5);
        this.drawingContext.fillStyle = 'rgba(255,255,255,' + this.b + ')';
        this.drawingContext.beginPath();
        this.drawingContext.arc(Math.trunc(this.x), Math.trunc(this.y), this.r, 0, Math.PI * 2);
        this.drawingContext.fill();
        this.drawingContext.closePath();
    };
    return Star;
}());



/***/ }),

/***/ "./src/game-controller.ts":
/*!********************************!*\
  !*** ./src/game-controller.ts ***!
  \********************************/
/*! exports provided: GameController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameController", function() { return GameController; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _game_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-engine */ "./src/game-engine.ts");
/* harmony import */ var _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard-controls */ "./src/keyboard-controls.ts");
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-handler */ "./src/event-handler.ts");
/* harmony import */ var _firework_firework_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./firework/firework-service */ "./src/firework/firework-service.ts");





var GameController = /** @class */ (function () {
    function GameController(drawingContext, playerManager) {
        this.drawingContext = drawingContext;
        this.playerManager = playerManager;
        this.frameLineWidth = 5;
        this.fireworkService = new _firework_firework_service__WEBPACK_IMPORTED_MODULE_4__["FireworkService"](this.drawingContext, false);
        this.drawKeySettings();
    }
    /**
     * This basically starts an entire game.
     */
    GameController.prototype.startGameEventListener = function (event) {
        if (event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Space || event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Enter) {
            if (this.playerManager.getNumberOfActivePlayers() < 2) {
                return;
            }
            this.drawGameFrames();
            this.gameEngine = new _game_engine__WEBPACK_IMPORTED_MODULE_1__["GameEngine"](this.drawingContext, this.playerManager.getPlayers());
            this.playerManager.initializePlayers();
            this.startRound();
            _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].removeEventListener('toggle-ready-keyboard');
            _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].removeEventListener('toggle-ready-mouse');
            _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].removeEventListener('start-game');
        }
    };
    /**
     * Starts a new round.
     */
    GameController.prototype.startRound = function () {
        var _this = this;
        this.drawPlayingFieldFrame();
        this.playerManager.initializePlayers();
        if (this.gameEngine) {
            this.gameEngine.start()
                .then(function (ranks) {
                _this.playerManager.updateScores(ranks);
                _this.drawScoreboard();
                if (_this.playerManager.getHighestScore() >= _this.getMaxScore()) {
                    _this.drawWinningScreen();
                }
                else {
                    _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].addEventListener('start-new-round', document, 'keydown', _this.startNextRoundKeyboardEvent.bind(_this));
                }
            });
        }
    };
    GameController.prototype.startNextRoundKeyboardEvent = function (event) {
        if (event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Space || event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Enter) {
            if (this.gameEngine) {
                _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].removeEventListener('start-new-round');
                this.startRound();
            }
        }
    };
    GameController.prototype.drawWinningScreen = function () {
        var _this = this;
        this.drawingContext.textAlign = 'middle';
        var fontSize = 40;
        this.drawingContext.font = fontSize + "px Fredericka the Great, cursive";
        var playersWon = this.playerManager.getPlayers()
            .filter(function (player) {
            return player.score === _this.playerManager.getHighestScore();
        });
        var textString = playersWon.map(function (player) { return player.name; }).join(', ') + " won !!!";
        var textWidth = this.drawingContext.measureText(textString).width;
        var xPosition = ((_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith) / 2) - (textWidth / 2);
        playersWon.forEach(function (player, index) {
            _this.drawingContext.fillStyle = player.color;
            var textChunk = "" + player.name + (index < playersWon.length - 1 ? ', ' : '');
            _this.drawingContext.fillText(textChunk, xPosition, (_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / 2) + (fontSize / 2));
            xPosition += _this.drawingContext.measureText(textChunk).width;
        });
        this.drawingContext.fillStyle = '#ffffff';
        var textChunk = ' won !!!';
        this.drawingContext.fillText(textChunk, xPosition, (_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / 2) + (fontSize / 2));
        this.fireworkService.start();
        this.playerManager.resetActiveStatus();
        this.playerManager.resetScores();
        _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].addEventListener('start-new-game', document, 'keydown', this.startNewGameKeyboardEvent.bind(this));
    };
    GameController.prototype.startNewGameKeyboardEvent = function (event) {
        if (event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Space || event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Enter) {
            _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].removeEventListener('start-new-game');
            this.fireworkService.stop();
            this.drawKeySettings();
        }
    };
    GameController.prototype.drawKeySettings = function () {
        var _this = this;
        this.drawingContext.clearRect(0, 0, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight);
        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = '#6E6E6E';
        this.drawingContext.strokeRect(this.frameLineWidth / 2, this.frameLineWidth / 2, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - this.frameLineWidth, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight - this.frameLineWidth);
        this.playerManager.getPlayers().forEach(function (player, index) {
            _this.drawingContext.textAlign = 'middle';
            var fontSize = 20;
            _this.drawingContext.font = fontSize + "px Fredericka the Great, cursive";
            _this.drawingContext.fillStyle = player.color;
            _this.drawingContext.fillText("( " + _this.getKeyName(player.leftControl) + "  " + _this.getKeyName(player.rightControl) + " )", 100, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / (_this.playerManager.getPlayers().length + 2) * (index + 1) - (fontSize / 3));
        });
        this.drawingContext.textAlign = 'middle';
        var fontSize = 16;
        this.drawingContext.font = "lighter " + fontSize + "px Helvetica, Arial, sans-serif";
        this.drawingContext.fillStyle = '#ffffff';
        var textString = 'If 2 or more players have joined, start the game by pressing Space or Enter';
        var textWidth = this.drawingContext.measureText(textString).width;
        this.drawingContext.fillText(textString, (_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth / 2) - (textWidth / 2), _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight - 50);
        _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].addEventListener('toggle-ready-keyboard', document, 'keydown', this.togglePlayerReadyStateKeyboard.bind(this));
        _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].addEventListener('toggle-ready-mouse', document, 'mousedown', this.togglePlayerReadyStateMouse.bind(this));
        _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].addEventListener('start-game', document, 'keydown', this.startGameEventListener.bind(this));
    };
    GameController.prototype.togglePlayerReadyStateMouse = function (event) {
        event.preventDefault();
        if (event.button === 0) {
            var activePlayer = this.playerManager.getPlayers().find(function (player) {
                return player.leftControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Left;
            });
            if (activePlayer) {
                this.drawPlayerReadyState(activePlayer, true);
            }
        }
        if (event.button === 2) {
            var activePlayer = this.playerManager.getPlayers().find(function (player) {
                return player.rightControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Right;
            });
            if (activePlayer) {
                this.drawPlayerReadyState(activePlayer, false);
            }
        }
    };
    GameController.prototype.togglePlayerReadyStateKeyboard = function (event) {
        var activePlayer = this.playerManager.getPlayers().find(function (player) {
            return player.leftControl === event.keyCode;
        });
        if (activePlayer) {
            this.drawPlayerReadyState(activePlayer, true);
        }
        var inactivePlayer = this.playerManager.getPlayers().find(function (player) {
            return player.rightControl === event.keyCode;
        });
        if (inactivePlayer) {
            this.drawPlayerReadyState(inactivePlayer, false);
        }
    };
    GameController.prototype.drawPlayerReadyState = function (player, state) {
        this.drawingContext.textAlign = 'middle';
        var fontSize = 20;
        this.drawingContext.font = fontSize + "px Fredericka the Great, cursive";
        this.drawingContext.fillStyle = player.color;
        var playerIndex = this.playerManager.getPlayers().findIndex(function (currentPlayer) {
            return currentPlayer === player;
        });
        var yPosition = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / (this.playerManager.getPlayers().length + 2)
            * (playerIndex + 1) - (fontSize / 3);
        this.drawingContext.clearRect(390, yPosition - fontSize, 100, fontSize + 5);
        player.isActive = state;
        if (state) {
            this.drawingContext.fillText('READY', 400, yPosition);
        }
    };
    GameController.prototype.getKeyName = function (keyCode) {
        switch (keyCode) {
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].One:
                return '1';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Q:
                return 'Q';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].LAlt:
                return 'L . Alt';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].RAlt:
                return 'R . Alt';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].M:
                return 'M';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Comma:
                return ',';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].P:
                return 'P';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].SZ:
                return 'ß';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Left:
                return 'L . Arrow';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Down:
                return 'D . Arrow';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Y:
                return 'Y';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].X:
                return 'X';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Left:
                return 'L . Mouse';
            case _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Right:
                return 'R . Mouse';
            default:
                return '';
        }
    };
    GameController.prototype.drawScoreboard = function () {
        var _this = this;
        this.drawingContext.clearRect(_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith, 0, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight);
        this.drawingContext.beginPath();
        this.drawingContext.rect(_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith, this.frameLineWidth / 2, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith - (this.frameLineWidth / 2), _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight - (this.frameLineWidth));
        this.drawingContext.fillStyle = '#3C3C3C';
        this.drawingContext.fill();
        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = '#6E6E6E';
        this.drawingContext.stroke();
        this.playerManager.getPlayers().forEach(function (player, index) {
            if (!player.isActive) {
                return;
            }
            _this.drawingContext.textAlign = 'middle';
            var fontSize = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / (_this.playerManager.getPlayers().length + 2);
            _this.drawingContext.font = fontSize + "px Fredericka the Great, cursive";
            _this.drawingContext.fillStyle = player.color;
            _this.drawingContext.fillText("" + player.score, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - (_config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith / 1.5) - (4 * _this.frameLineWidth), _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / _this.playerManager.getPlayers().length * (index + 1) - (fontSize / 3));
        });
    };
    GameController.prototype.drawGameFrames = function () {
        this.drawPlayingFieldFrame();
        this.drawScoreboard();
    };
    GameController.prototype.drawPlayingFieldFrame = function () {
        this.drawingContext.clearRect(0, 0, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight);
        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = '#6E6E6E';
        this.drawingContext.strokeRect(this.frameLineWidth / 2, this.frameLineWidth / 2, _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith - (this.frameLineWidth / 2), _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight - this.frameLineWidth);
    };
    GameController.prototype.getMaxScore = function () {
        return (this.playerManager.getNumberOfActivePlayers() - 1) * 10;
    };
    return GameController;
}());



/***/ }),

/***/ "./src/game-engine.ts":
/*!****************************!*\
  !*** ./src/game-engine.ts ***!
  \****************************/
/*! exports provided: GameEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameEngine", function() { return GameEngine; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard-controls */ "./src/keyboard-controls.ts");
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event-handler */ "./src/event-handler.ts");




var GameEngine = /** @class */ (function () {
    function GameEngine(canvas, players) {
        this.interval = 0;
        this.stepsUntilHolePerPlayer = new Map();
        this.holeSizePerPlayer = new Map();
        this.speed = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].pixelsPerSecond * (1000 / _config__WEBPACK_IMPORTED_MODULE_0__["Config"].fps / 1000);
        this.playerRanks = [];
        this.canvasContext = canvas;
        this.players = players;
    }
    GameEngine.prototype.start = function () {
        var _this = this;
        if (this.interval) {
            return new Promise(function (resolve) { return resolve([]); });
        }
        return new Promise(function (resolve, reject) {
            _this.resolveCallback = resolve;
            _this.playerRanks = [];
            // Start drawing first few pixels so everybody knows his start position
            _this.draw();
            _this.draw();
            _this.draw();
            _this.draw();
            _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].addEventListener('draw', document, 'keydown', _this.startDrawingIntervalEvent.bind(_this));
        });
    };
    GameEngine.prototype.startDrawingIntervalEvent = function (event) {
        var _this = this;
        if (event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Space || event.keyCode === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EKeyCode"].Enter) {
            if (!this.interval) {
                this.interval = setInterval(function () {
                    _event_handler__WEBPACK_IMPORTED_MODULE_3__["EventHandler"].removeEventListener('draw');
                    _this.draw();
                }, 1000 / _config__WEBPACK_IMPORTED_MODULE_0__["Config"].fps);
            }
        }
    };
    GameEngine.prototype.stop = function () {
        clearInterval(this.interval);
        this.interval = 0;
        if (this.resolveCallback) {
            this.resolveCallback(this.playerRanks);
        }
    };
    GameEngine.prototype.draw = function () {
        var _this = this;
        this.players
            .filter(function (player) {
            return player.isActive && player.isAlive;
        })
            .forEach(function (player) {
            if (player.isTurningLeft) {
                player.angle -= _config__WEBPACK_IMPORTED_MODULE_0__["Config"].angleModifier;
            }
            if (player.isTurningRight) {
                player.angle += _config__WEBPACK_IMPORTED_MODULE_0__["Config"].angleModifier;
            }
            var deltaX = Math.cos(player.angle * Math.PI / 180) * _this.speed;
            var deltaY = Math.sin(player.angle * Math.PI / 180) * _this.speed;
            if (_this.hitTest({ x: player.xPosition + deltaX, y: player.yPosition + deltaY })) {
                _this.playerRanks.unshift(player);
                player.isAlive = false;
                var alivePlayers = _this.players.filter(function (player) {
                    return player.isAlive;
                });
                if (alivePlayers.length < 2) {
                    alivePlayers.forEach(function (player) {
                        _this.playerRanks.unshift(player);
                    });
                    _this.stop();
                }
            }
            if (!_this.stepsUntilHolePerPlayer.has(player.id)) {
                _this.stepsUntilHolePerPlayer.set(player.id, _this.getStepsUntilNextHole());
            }
            if (_this.stepsUntilHolePerPlayer.get(player.id) === 0) {
                if (!_this.holeSizePerPlayer.has(player.id)) {
                    _this.holeSizePerPlayer.set(player.id, 0);
                }
                else {
                    var holeSize = (_this.holeSizePerPlayer.get(player.id) || 0) + 1;
                    _this.holeSizePerPlayer.set(player.id, holeSize);
                    if (holeSize >= _config__WEBPACK_IMPORTED_MODULE_0__["Config"].holeSize) {
                        _this.stepsUntilHolePerPlayer.set(player.id, _this.getStepsUntilNextHole());
                        _this.holeSizePerPlayer.set(player.id, 0);
                    }
                }
            }
            else {
                _this.stepsUntilHolePerPlayer.set(player.id, (_this.stepsUntilHolePerPlayer.get(player.id) || 1) - 1);
                _this.canvasContext.strokeStyle = player.color;
                _this.canvasContext.fillStyle = player.color;
                _this.canvasContext.beginPath();
                _this.canvasContext.lineWidth = _config__WEBPACK_IMPORTED_MODULE_0__["Config"].lineWidth;
                _this.canvasContext.moveTo(player.xPosition, player.yPosition);
                _this.canvasContext.lineTo(player.xPosition + deltaX, player.yPosition + deltaY);
                _this.canvasContext.stroke();
            }
            player.xPosition += deltaX;
            player.yPosition += deltaY;
        });
    };
    GameEngine.prototype.getStepsUntilNextHole = function () {
        return Math.floor(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomNumber"])(1, 100) * (100 / _config__WEBPACK_IMPORTED_MODULE_0__["Config"].holeFrequency));
    };
    GameEngine.prototype.hitTest = function (point) {
        if (point.x > _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth || point.y > _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight || point.x < 0 || point.y < 0) {
            return true;
        }
        if (this.canvasContext.getImageData(point.x, point.y, 1, 1).data[3] > 100) {
            return true;
        }
        return false;
    };
    return GameEngine;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-controller */ "./src/game-controller.ts");
/* harmony import */ var _player_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player-manager */ "./src/player-manager.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.ts");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keyboard-controls */ "./src/keyboard-controls.ts");
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event-handler */ "./src/event-handler.ts");







window.onload = function () {
    _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasWidth = document.body.clientWidth - 20;
    _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasHeight = document.body.clientHeight - 50;
    var canvasId = 'canvas';
    var canvasElement = document.getElementById(canvasId);
    if (!canvasElement) {
        throw new Error('No canvas element found');
    }
    canvasElement.width = _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasWidth;
    canvasElement.height = _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasHeight;
    var drawingContext;
    if (canvasElement.getContext) {
        drawingContext = canvasElement.getContext('2d');
    }
    else {
        throw new Error('No canvas support');
    }
    drawIntroText();
    _event_handler__WEBPACK_IMPORTED_MODULE_6__["EventHandler"].oneTimeEventListener(document, 'keydown', initGame);
    function drawIntroText() {
        var frameLineWidth = 5;
        drawingContext.lineWidth = frameLineWidth;
        drawingContext.strokeStyle = '#6E6E6E';
        drawingContext.strokeRect(frameLineWidth / 2, frameLineWidth / 2, _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasWidth - frameLineWidth, _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasHeight - frameLineWidth);
        drawingContext.textAlign = 'middle';
        var fontSize = _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasHeight / 10;
        drawingContext.font = fontSize + "px Fredericka the Great, cursive";
        drawingContext.fillStyle = '#ffffff';
        var textString = 'Achtung, die Kurve !';
        var textWidth = drawingContext.measureText(textString).width;
        drawingContext.fillText(textString, (_config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasWidth / 2) - (textWidth / 2), (_config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasHeight / 2) + (fontSize / 2));
        drawingContext.textAlign = 'middle';
        drawingContext.font = "lighter 16px Helvetica, Arial, sans-serif";
        drawingContext.fillStyle = '#ffffff';
        textString = 'Press any key to continue';
        textWidth = drawingContext.measureText(textString).width;
        drawingContext.fillText(textString, (_config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasWidth / 2) - (textWidth / 2), _config__WEBPACK_IMPORTED_MODULE_4__["Config"].canvasHeight - 50);
    }
    function initGame() {
        var playerManager = new _player_manager__WEBPACK_IMPORTED_MODULE_1__["PlayerManager"]();
        var player1 = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"](1, 'Player 1', _color__WEBPACK_IMPORTED_MODULE_3__["EColor"].Red, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].One, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].Q);
        playerManager.addPlayer(player1);
        var player2 = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"](2, 'Player 2', _color__WEBPACK_IMPORTED_MODULE_3__["EColor"].Yellow, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].Y, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].X);
        playerManager.addPlayer(player2);
        var player3 = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"](3, 'Player 3', _color__WEBPACK_IMPORTED_MODULE_3__["EColor"].Orange, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].M, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].Comma);
        playerManager.addPlayer(player3);
        var player4 = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"](4, 'Player 4', _color__WEBPACK_IMPORTED_MODULE_3__["EColor"].Green, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].Left, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].Down);
        playerManager.addPlayer(player4);
        var player5 = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"](5, 'Player 5', _color__WEBPACK_IMPORTED_MODULE_3__["EColor"].Pink, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].P, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EKeyCode"].SZ);
        playerManager.addPlayer(player5);
        var player6 = new _player__WEBPACK_IMPORTED_MODULE_2__["Player"](6, 'Player 6', _color__WEBPACK_IMPORTED_MODULE_3__["EColor"].Blue, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EMouseClick"].Left, _keyboard_controls__WEBPACK_IMPORTED_MODULE_5__["EMouseClick"].Right);
        playerManager.addPlayer(player6);
        var game = new _game_controller__WEBPACK_IMPORTED_MODULE_0__["GameController"](drawingContext, playerManager);
    }
};


/***/ }),

/***/ "./src/keyboard-controls.ts":
/*!**********************************!*\
  !*** ./src/keyboard-controls.ts ***!
  \**********************************/
/*! exports provided: EKeyCode, EMouseClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EKeyCode", function() { return EKeyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMouseClick", function() { return EMouseClick; });
var EKeyCode;
(function (EKeyCode) {
    EKeyCode[EKeyCode["One"] = 49] = "One";
    EKeyCode[EKeyCode["Q"] = 81] = "Q";
    EKeyCode[EKeyCode["LAlt"] = 17] = "LAlt";
    EKeyCode[EKeyCode["RAlt"] = 18] = "RAlt";
    EKeyCode[EKeyCode["M"] = 77] = "M";
    EKeyCode[EKeyCode["Comma"] = 188] = "Comma";
    EKeyCode[EKeyCode["P"] = 80] = "P";
    EKeyCode[EKeyCode["SZ"] = 189] = "SZ";
    EKeyCode[EKeyCode["Left"] = 37] = "Left";
    EKeyCode[EKeyCode["Down"] = 40] = "Down";
    EKeyCode[EKeyCode["Space"] = 32] = "Space";
    EKeyCode[EKeyCode["Enter"] = 13] = "Enter";
    EKeyCode[EKeyCode["Y"] = 89] = "Y";
    EKeyCode[EKeyCode["X"] = 88] = "X";
})(EKeyCode || (EKeyCode = {}));
var EMouseClick;
(function (EMouseClick) {
    EMouseClick["Left"] = "Left";
    EMouseClick["Right"] = "Right";
})(EMouseClick || (EMouseClick = {}));



/***/ }),

/***/ "./src/player-manager.ts":
/*!*******************************!*\
  !*** ./src/player-manager.ts ***!
  \*******************************/
/*! exports provided: PlayerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerManager", function() { return PlayerManager; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard-controls */ "./src/keyboard-controls.ts");



var PlayerManager = /** @class */ (function () {
    function PlayerManager() {
        this.players = new Map();
    }
    PlayerManager.prototype.addPlayer = function (player) {
        if (this.players.has(player.id)) {
            throw new Error('Player with given Id already existing');
        }
        this.players.set(player.id, player);
        this.bindKeyboardControls(player);
    };
    PlayerManager.prototype.removePlayer = function (player) {
        this.players.delete(player.id);
        // technically we need to unbind keyboard controls here
        // method currently unused so ¯\_(ツ)_/¯
    };
    PlayerManager.prototype.initializePlayers = function () {
        Array.from(this.players.values())
            .filter(function (player) {
            return player.isActive;
        })
            .forEach(function (player) {
            player.xPosition = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomNumber"])((_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith) / 5, 4 * (_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasWidth - _config__WEBPACK_IMPORTED_MODULE_0__["Config"].scoreBoardWith) / 5);
            player.yPosition = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRandomNumber"])(_config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / 5, 4 * _config__WEBPACK_IMPORTED_MODULE_0__["Config"].canvasHeight / 5);
            player.angle = Math.random() * 360;
            player.isAlive = true;
        });
    };
    PlayerManager.prototype.bindKeyboardControls = function (player) {
        // Todo: To beb consistent we should use the EventHandler here...
        document.addEventListener('keydown', function (event) {
            event.preventDefault();
            if (event.keyCode === player.leftControl) {
                player.isTurningLeft = true;
            }
            if (event.keyCode === player.rightControl) {
                player.isTurningRight = true;
            }
        });
        document.addEventListener('keyup', function (event) {
            event.preventDefault();
            if (event.keyCode === player.leftControl) {
                player.isTurningLeft = false;
            }
            if (event.keyCode === player.rightControl) {
                player.isTurningRight = false;
            }
        });
        document.addEventListener('mousedown', function (event) {
            event.preventDefault();
            if (event.button === 0) {
                if (player.leftControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Left) {
                    player.isTurningLeft = true;
                }
                if (player.rightControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Left) {
                    player.isTurningRight = true;
                }
            }
            if (event.button === 2) {
                if (player.leftControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Right) {
                    player.isTurningLeft = true;
                }
                if (player.rightControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Right) {
                    player.isTurningRight = true;
                }
            }
        });
        document.addEventListener('mouseup', function (event) {
            event.preventDefault();
            if (event.button === 0) {
                if (player.leftControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Left) {
                    player.isTurningLeft = false;
                }
                if (player.rightControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Left) {
                    player.isTurningRight = false;
                }
            }
            if (event.button === 2) {
                if (player.leftControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Right) {
                    player.isTurningLeft = false;
                }
                if (player.rightControl === _keyboard_controls__WEBPACK_IMPORTED_MODULE_2__["EMouseClick"].Right) {
                    player.isTurningRight = false;
                }
            }
        });
    };
    PlayerManager.prototype.getPlayers = function () {
        return Array.from(this.players.values());
    };
    PlayerManager.prototype.getNumberOfActivePlayers = function () {
        return this.getPlayers().filter(function (player) {
            return player.isActive;
        }).length;
    };
    PlayerManager.prototype.updateScores = function (ranks) {
        var _this = this;
        ranks.forEach(function (player, index) {
            player.score += _this.getNumberOfActivePlayers() - index - 1;
        });
    };
    PlayerManager.prototype.getHighestScore = function () {
        var scores = Array.from(this.players.values()).map(function (player) {
            return player.score;
        });
        return Math.max.apply(Math, scores);
    };
    PlayerManager.prototype.resetActiveStatus = function () {
        Array.from(this.players.values()).forEach(function (player) {
            player.isActive = false;
        });
    };
    PlayerManager.prototype.resetScores = function () {
        Array.from(this.players.values()).forEach(function (player) {
            player.score = 0;
        });
    };
    return PlayerManager;
}());



/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
var Player = /** @class */ (function () {
    function Player(id, name, color, leftControl, rightControl) {
        this._xPosition = 0;
        this._yPosition = 0;
        this._angle = 0;
        this._isAlive = false;
        this._score = 0;
        this._isTurningLeft = false;
        this._isTurningRight = false;
        this._isActive = false;
        this._id = id;
        this._name = name;
        this._color = color;
        this._leftControl = leftControl;
        this._rightControl = rightControl;
    }
    Object.defineProperty(Player.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "xPosition", {
        get: function () {
            return this._xPosition;
        },
        set: function (value) {
            this._xPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "yPosition", {
        get: function () {
            return this._yPosition;
        },
        set: function (value) {
            this._yPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "angle", {
        get: function () {
            return this._angle;
        },
        set: function (value) {
            this._angle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isAlive", {
        get: function () {
            return this._isAlive;
        },
        set: function (value) {
            this._isAlive = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (value) {
            this._score = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isTurningLeft", {
        get: function () {
            return this._isTurningLeft;
        },
        set: function (value) {
            this._isTurningLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isTurningRight", {
        get: function () {
            return this._isTurningRight;
        },
        set: function (value) {
            this._isTurningRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "leftControl", {
        get: function () {
            return this._leftControl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "rightControl", {
        get: function () {
            return this._rightControl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());



/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: getRandomNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNumber", function() { return getRandomNumber; });
function getRandomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}



/***/ })

/******/ });
//# sourceMappingURL=app.js.map