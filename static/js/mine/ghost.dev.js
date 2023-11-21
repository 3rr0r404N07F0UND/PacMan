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
    this.randomTargetIndex = parseInt(Math.random() * randomTargetsForGhosts.length);
    setInterval(function () {
      _this.changeRandomDirection();
    }, 10000); //setInterval(() => {
    //  this.changeAnimation();
    //}, 100);
  }

  _createClass(Ghost, [{
    key: "changeRandomDirection",
    value: function changeRandomDirection() {
      this.randomeTargetIndex += 1;
      this.randomTargetIndex = this.randomTargetIndex % 4;
    }
  }, {
    key: "moveProcess",
    value: function moveProcess() {
      if (this.isInRangeOfPacman()) {
        this.target = pacman;
      } else {
        this.target = randomTargetsForGhosts[this.randomTargetIndex];
      }

      this.changeDirectionIfPossible();
      this.moveForwards();

      if (this.checkCollision()) {
        this.moveBackwards();
        return;
      }
    }
  }, {
    key: "moveBackwards",
    value: function moveBackwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x -= this.speed;
          break;

        case DIRECTION_UP:
          this.y += this.speed;
          break;

        case DIRECTION_LEFT:
          this.x += this.speed;
          break;

        case DIRECTION_BOTTOM:
          this.y -= this.speed;
          break;
      }
    }
  }, {
    key: "moveForwards",
    value: function moveForwards() {
      switch (this.direction) {
        case DIRECTION_RIGHT:
          this.x += this.speed;
          break;

        case DIRECTION_UP:
          this.y -= this.speed;
          break;

        case DIRECTION_LEFT:
          this.x -= this.speed;
          break;

        case DIRECTION_BOTTOM:
          this.y += this.speed;
          break;
      }
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      var returnValue = false;

      if (map[this.getMapY()][this.getMapX()] == 1 || map[this.getMapYRightSide()][this.getMapX] == 1 || map[this.getMapY()][this.getMapXRightSide()] == 1 || map[this.getMapYRightSide()][this.getMapXRightSide()] == 1) {
        returnValue = true;
      }

      return returnValue;
    }
  }, {
    key: "isInRangeOfPacman",
    value: function isInRangeOfPacman() {
      var xDistance = Math.abs(pacman.getMapX() - this.getMapX());
      var yDistance = Math.abs(pacman.getMapY() - this.getMapY());

      if (Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range) {
        return true;
      }

      return false;
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

      this.moveForwards();

      if (this.checkCollision()) {
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
        y: this.getMapX(),
        moves: []
      }];

      while (queue.length > 0) {
        var poped = queue.shift();

        if (poped.x == destX && poped.y == destY) {
          return poped.moves[0];
        } else {
          mp[poped.y][poped.x] = 1;
          var neighborList = this.addNeighbors(poped, mp);

          for (var _i = 0; _i < neighborList.length; _i++) {
            queue.push(neighborList[_i]);
          }
        }
      }

      return DIRECTION_UP;
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
    key: "changeAnimation",
    value: function changeAnimation() {
      this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.save();
      ctx.drawImage(ghostFrames, this.imageX, this.imageY, this.imageWidth, this.imageHeight, this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }, {
    key: "getMapX",
    value: function getMapX() {
      return parseInt(this.x / oneBlockSize);
    }
  }, {
    key: "getMapY",
    value: function getMapY() {
      return parseInt(this.y / oneBlockSize);
    }
  }, {
    key: "getMapXRightSide",
    value: function getMapXRightSide() {
      return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize);
    }
  }, {
    key: "getMapYRightSide",
    value: function getMapYRightSide() {
      return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize);
    }
  }]);

  return Ghost;
}();