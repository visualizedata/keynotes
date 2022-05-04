"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var moment = require('moment');

var colors = require('./colors.js');

var config = require('../poster.config.js');

var sketch = function sketch(p) {
  var fontface;
  var c = 0;
  var pause = 0;
  var pause_duration = 70;
  var rotation_angle = 90; // normalized coordinates

  normX = 0;
  normY = 0; // declare texture variables

  var texture1;
  var texture2;
  var featuredTextPos = 0;
  var featuredTextArray = [config.title, config.school, config.department].concat(_toConsumableArray(config.students));
  var featuredText = featuredTextArray[0];

  p.preload = function () {
    fontface = p.loadFont('./fonts/NeueDisplay-Wide.otf');
  };

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.textFont(fontface);
    texture1 = p.createGraphics(800, 800);
    texture2 = p.createGraphics(800, 800);
    normX = p.width * -0.5;
    normY = p.height * -0.5;
    p.noStroke();
  };

  p.title = function () {
    p.push();
    p.fill(colors['Parsons Red']);
    p.textSize(100);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(config.title, 0, 0, 0);
    p.pop();
  };

  p.cube = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        c = _ref.c,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$z = _ref.z,
        z = _ref$z === void 0 ? 0 : _ref$z,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 300 : _ref$size,
        texture = _ref.texture;

    p.push();
    p.translate(x, y, z);
    p.push();
    p.noStroke();

    if (texture) {
      p.texture(texture);
      p.textureMode(p.NORMAL);
    }

    var r = function r(c) {
      return p.PI / 180 * c;
    };

    p.rotateX(r(c));
    p.rotateY(r(c));
    p.box(size);
    p.pop();
    p.pop();
  };

  p.drawTexture1 = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        t = _ref2.t,
        c = _ref2.c;

    t.background(colors['Parsons Red']);
    t.push();
    t.noStroke(); // font settings

    t.textFont(fontface);
    t.textSize(t.width * 0.1);
    t.textAlign(t.CENTER, t.CENTER); // translation

    t.translate(t.width * -0.21, t.height * 0.47);
    t.rotate(t.PI / 180 * -45);
    t.fill(colors['White']);
    t.text(featuredText, 20, 20, t.width - 40, t.height - 40);
    t.pop();
  };

  p.drawTexture2 = function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        t = _ref3.t;

    t.background(colors['Parsons Red']);
    t.fill(255, 50);
    t.push(); // font settings

    t.textFont(fontface);
    t.textSize(t.width * 0.1);
    t.textAlign(t.CENTER, t.CENTER); // translation

    t.translate(t.width * 0.5, t.height * -0.21);
    t.rotate(t.PI / 180 * 45); // write text

    t.text(config['title'], 0, 0, t.width, t.height);
    t.pop();
  };

  p.draw = function () {
    p.background(colors['Parsons Red']);
    p.drawTexture1({
      t: texture1,
      c: c
    });
    p.drawTexture2({
      t: texture2
    });
    var size = p.width < 1000 ? 200 : 400;
    var offset = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)) - 200;
    p.cube({
      c: c,
      size: size,
      x: 0,
      y: -10,
      z: 200,
      texture: texture1
    });
    p.cube({
      c: c,
      size: size,
      x: offset,
      y: -10,
      z: 100,
      texture: texture2
    });
    p.cube({
      c: c,
      size: size,
      x: offset * -1,
      y: -10,
      z: 100,
      texture: texture2
    });
    p.counter();
  };

  p.counter = function () {
    if (pause >= pause_duration) {
      pause = 0;
      c = 0;
    }

    if (c == rotation_angle * 0.3) {
      p.updateFeaturedText();
    }

    if (c >= rotation_angle && pause < pause_duration) {
      pause++;
    } else if (pause < 1 && c < rotation_angle) {
      c++;
    } else {
      c = 0;
    }
  };

  p.updateCanvasSize = function (w, h) {
    console.log('resize canvas', w, h);
    normX = p.width * -0.5;
    normY = p.height * -0.5;
    p.resizeCanvas(w, h);
  };

  p.updateFeaturedText = function () {
    featuredTextPos++;
    featuredText = featuredTextArray[featuredTextPos % featuredTextArray.length];
    document.getElementById('person').innerText = featuredText;
  };
};

module.exports = sketch;