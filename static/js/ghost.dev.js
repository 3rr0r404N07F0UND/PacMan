"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ghost =
/*#__PURE__*/
function () {
  function Ghost(x, y, width, height, speed, imageX, imageY, imageWidth, imageHeight, range) {
    var _this = this;

    _classCallCheck(this, Ghost);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
    this.randomTargetIndex = parseInt(Math.random() * 4);
    this.target = randomTargetsForGhosts[this.randomTargetIndex];
    setInterval(function () {
      _this.changeRandomDirection();
    }, 10000);
  }

  _createClass(Ghost, [{
    key: "isInRange",
    value: function isInRange() {
      var xDistance = Math.abs(pacman.getMapX() - this.getMapX());
      var yDistance = Math.abs(pacman.getMapY() - this.getMapY());

      if (Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range) {
        return true;
      }

      return false;
    }
  }, {
    key: "changeRandomDirection",
    value: function changeRandomDirection() {
      var addition = 1;
      this.randomTargetIndex += addition;
      this.randomTargetIndex = this.randomTargetIndex % 4;
    }
  }, {
    key: "moveProcess",
    value: function moveProcess() {
      if (this.isInRange()) {
        this.target = pacman;
      } else {
        this.target = randomTargetsForGhosts[this.randomTargetIndex];
      }

      this.changeDirectionIfPossible();
      this.moveForwards();

      if (this.checkCollisions()) {
        this.moveBackwards();
        return;
      }
    }
  }, {
    key: "moveBackwards",
    value: function moveBackwards() {
      switch (this.direction) {
        case 4:
          // Right
          this.x -= this.speed;
          break;

        case 3:
          // Up
          this.y += this.speed;
          break;

        case 2:
          // Left
          this.x += this.speed;
          break;

        case 1:
          // Bottom
          this.y -= this.speed;
          break;
      }
    }
  }, {
    key: "moveForwards",
    value: function moveForwards() {
      switch (this.direction) {
        case 4:
          // Right
          this.x += this.speed;
          break;

        case 3:
          // Up
          this.y -= this.speed;
          break;

        case 2:
          // Left
          this.x -= this.speed;
          break;

        case 1:
          // Bottom
          this.y += this.speed;
          break;
      }
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var isCollided = false;

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 4) {
        this.x = 380;
      }

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 5) {
        this.x = 20;
      }

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 7) {
        this.y = 160;
      }

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 1 || map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize)] == 1 || map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize + 0.9999)] == 1 || map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize + 0.9999)] == 1) {
        isCollided = true;
      }

      return isCollided;
    }
  }, {
    key: "changeDirectionIfPossible",
    value: function changeDirectionIfPossible() {
      var tempDirection = this.direction;
      this.direction = this.calculateNewDirection(map, parseInt(this.target.x / oneBlockSize), parseInt(this.target.y / oneBlockSize));

      if (typeof this.direction == "undefined") {
        this.direction = tempDirection;
        return;
      }

      if (this.getMapY() != this.getMapYRightSide() && (this.direction == DIRECTION_LEFT || this.direction == DIRECTION_RIGHT)) {
        this.direction = DIRECTION_UP;
      }

      if (this.getMapX() != this.getMapXRightSide() && this.direction == DIRECTION_UP) {
        this.direction = DIRECTION_LEFT;
      }

      this.moveForwards();

      if (this.checkCollisions()) {
        this.moveBackwards();
        this.direction = tempDirection;
      } else {
        this.moveBackwards();
      }
    }
  }, {
    key: "calculateNewDirection",
    value: function calculateNewDirection(map, destX, destY) {
      var mp = [];

      for (var i = 0; i < map.length; i++) {
        mp[i] = map[i].slice();
      }

      var queue = [{
        x: this.getMapX(),
        y: this.getMapY(),
        rightX: this.getMapXRightSide(),
        rightY: this.getMapYRightSide(),
        moves: []
      }];

      while (queue.length > 0) {
        var poped = queue.shift();

        if (poped.x == destX && poped.y == destY) {
          return poped.moves[0];
        } else {
          mp[poped.y][poped.x] = 1;
          var neighborList = this.addNeighbors(poped, mp);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = neighborList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var element = _step.value;
              queue.push(element);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }

      return 1;
    }
  }, {
    key: "addNeighbors",
    value: function addNeighbors(poped, mp) {
      var queue = [];
      var numOfRows = mp.length;
      var numOfColumns = mp[0].length;

      if (poped.x - 1 >= 0 && poped.x - 1 < numOfRows && mp[poped.y][poped.x - 1] != 1) {
        var tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_LEFT);
        queue.push({
          x: poped.x - 1,
          y: poped.y,
          moves: tempMoves
        });
      }

      if (poped.x + 1 >= 0 && poped.x + 1 < numOfRows && mp[poped.y][poped.x + 1] != 1) {
        var _tempMoves = poped.moves.slice();

        _tempMoves.push(DIRECTION_RIGHT);

        queue.push({
          x: poped.x + 1,
          y: poped.y,
          moves: _tempMoves
        });
      }

      if (poped.y - 1 >= 0 && poped.y - 1 < numOfColumns && mp[poped.y - 1][poped.x] != 1) {
        var _tempMoves2 = poped.moves.slice();

        _tempMoves2.push(DIRECTION_UP);

        queue.push({
          x: poped.x,
          y: poped.y - 1,
          moves: _tempMoves2
        });
      }

      if (poped.y + 1 >= 0 && poped.y + 1 < numOfColumns && mp[poped.y + 1][poped.x] != 1) {
        var _tempMoves3 = poped.moves.slice();

        _tempMoves3.push(DIRECTION_BOTTOM);

        queue.push({
          x: poped.x,
          y: poped.y + 1,
          moves: _tempMoves3
        });
      }

      return queue;
    }
  }, {
    key: "getMapX",
    value: function getMapX() {
      var mapX = parseInt(this.x / oneBlockSize);
      return mapX;
    }
  }, {
    key: "getMapY",
    value: function getMapY() {
      var mapY = parseInt(this.y / oneBlockSize);
      return mapY;
    }
  }, {
    key: "getMapXRightSide",
    value: function getMapXRightSide() {
      var mapX = parseInt((this.x * 0.99 + oneBlockSize) / oneBlockSize);
      return mapX;
    }
  }, {
    key: "getMapYRightSide",
    value: function getMapYRightSide() {
      var mapY = parseInt((this.y * 0.99 + oneBlockSize) / oneBlockSize);
      return mapY;
    }
  }, {
    key: "changeAnimation",
    value: function changeAnimation() {
      this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }
  }, {
    key: "draw",
    value: function draw() {
      canvasContext.save();
      canvasContext.drawImage(ghostFrames, this.imageX, this.imageY, this.imageWidth, this.imageHeight, this.x, this.y, this.width, this.height);
      canvasContext.restore();
      canvasContext.beginPath();
      canvasContext.stroke();
    }
  }]);

  return Ghost;
}();

var updateGhosts = function updateGhosts() {
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].moveProcess();
  }
};

var drawGhosts = function drawGhosts() {
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].draw();
  }
};