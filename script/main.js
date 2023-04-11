// Generated by CoffeeScript 1.4.0
(function() {
  var Block, Dirt, Entity, Gravel, Ladder, Level, Ninja, Player, Rock, Treasure, gfx, keys, levels, utils,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = {
    now: function() {
      return new Date().getTime();
    },
    snap: function(value, snapSize) {
      return Math.floor(value / snapSize) * snapSize;
    },
    rand: function(min, max) {
      var range;
      if (!(max != null)) {
        max = min;
        min = 0;
      }
      range = max - min;
      return Math.floor((Math.random() * range) + min);
    }
  };

  gfx = {
    tileW: 24,
    tileH: 24,
    init: function() {
      var canvas;
      canvas = document.querySelector("#game");
      this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
      if (!this.ctx) {
        return false;
      }
      this.w = canvas.width;
      this.h = canvas.height;
      return true;
    },
    clear: function() {
      return this.ctx.clearRect(0, 0, this.w, this.h);
    },
    load: function(onload) {
      this.sprites = new Image();
      this.sprites.src = "resources/sprites.png";
      return this.sprites.onload = function() {
        return onload();
      };
    },
    drawSprite: function(col, row, x, y, w, h, scale) {
      if (w == null) {
        w = 1;
      }
      if (h == null) {
        h = 1;
      }
      if (scale == null) {
        scale = 1;
      }
      w *= this.tileW;
      h *= this.tileH;
      return this.ctx.drawImage(this.sprites, col * w, row * h, w, h, x, y, w * scale, h * scale);
    }
  };

  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    reset: function() {
      return this.up = this.down = this.left = this.right = this.space = false;
    },
    trigger: function(keyCode, isDown) {
      switch (keyCode) {
        case 37:
          return this.left = isDown;
        case 39:
          return this.right = isDown;
        case 38:
          return this.up = isDown;
        case 40:
          return this.down = isDown;
        case 32:
          if (isDown) {
            console.log("FIRE AWAY!");
          }
          return this.space = isDown;
      }
    }
  };

  document.addEventListener("keydown", function(e) {
    return keys.trigger(e.keyCode, true);
  }, false);

  document.addEventListener("keyup", function(e) {
    return keys.trigger(e.keyCode, false);
  }, false);

  Level = (function() {

    Level.prototype.w = 0;

    Level.prototype.h = 0;

    Level.prototype.treasures = 0;

    Level.prototype.ninjas = [];

    function Level(level, game) {
      this.game = game;
      this.load(level);
    }

    Level.prototype.load = function(level) {
      var asciiMap, col, row, x, y;
      this.ninjas = [];
      this.treasures = 0;
      asciiMap = (function() {
        var _i, _len, _ref, _results;
        _ref = level.data.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          _results.push(row.split(""));
        }
        return _results;
      })();
      this.map = (function() {
        var _i, _len, _results;
        _results = [];
        for (y = _i = 0, _len = asciiMap.length; _i < _len; y = ++_i) {
          row = asciiMap[y];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
              col = row[x];
              switch (col) {
                case "@":
                  _results1.push(new Dirt());
                  break;
                case "O":
                  _results1.push(new Rock());
                  break;
                case "P":
                  this.addPlayer(x, y);
                  _results1.push(new Block());
                  break;
                case "X":
                  this.addNinja(x, y);
                  _results1.push(new Block());
                  break;
                case "*":
                  this.treasures++;
                  _results1.push(new Treasure());
                  break;
                case "#":
                  _results1.push(new Ladder());
                  break;
                case "-":
                  _results1.push(new Ladder(true));
                  break;
                default:
                  _results1.push(new Block());
              }
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }).call(this);
      this.h = this.map.length;
      return this.w = this.map[0].length;
    };

    Level.prototype.addNinja = function(x, y) {
      var ninja, xPos, yPos;
      xPos = x * gfx.tileW;
      yPos = y * gfx.tileH;
      ninja = new Ninja(this, xPos, yPos, this.game.player);
      return this.ninjas.push(ninja);
    };

    Level.prototype.addPlayer = function(x, y) {
      return this.game.setPlayer(x * gfx.tileW, y * gfx.tileH, this);
    };

    Level.prototype.removeBlock = function(x, y, block) {
      this.map[y][x] = new Block();
      if (block.constructor === Treasure) {
        if (--this.treasures === 0) {
          alert("Level Complete!");
          return game.reset();
        }
      }
    };

    Level.prototype.getBlockIndex = function(x, y) {
      return [Math.floor(x / gfx.tileW), Math.floor(y / gfx.tileH)];
    };

    Level.prototype.getBlockEdge = function(position, forVertical) {
      var snapTo;
      if (forVertical == null) {
        forVertical = false;
      }
      snapTo = !forVertical ? gfx.tileW : gfx.tileH;
      return utils.snap(position, snapTo);
    };

    Level.prototype.getBlock = function(x, y) {
      var xBlock, yBlock, _ref, _ref1;
      _ref = this.getBlockIndex(x, y), xBlock = _ref[0], yBlock = _ref[1];
      return ((_ref1 = this.map[yBlock]) != null ? _ref1[xBlock] : void 0) || new Rock();
    };

    Level.prototype.getBlocks = function() {
      var coords, x, y, _i, _len, _ref, _results;
      coords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = coords.length; _i < _len; _i++) {
        _ref = coords[_i], x = _ref[0], y = _ref[1];
        _results.push(this.getBlock(x, y));
      }
      return _results;
    };

