"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pacman =
/*#__PURE__*/
function () {
  function Pacman(x, y, width, height, speed) {
    var _this = this;

    _classCallCheck(this, Pacman);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.nextDirection = this.direction;
    this.direction = DIRECTION_RIGHT;
    this.currentFrame = 1;
    this.frameCount = 7;
    setInterval(function () {
      _this.changeAnimation();
    }, 100);
  }

  _createClass(Pacman, [{
    key: "moveProcess",
    value: function moveProcess() {
      this.changeDirectionIfPossible();
      this.moveForwards();

      if (this.checkCollision()) {
        this.moveBackwards();
      }
    }
  }, {
    key: "eat",
    value: function eat() {
      for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
          if (map[i][j] == 2 && this.getMapX() == j && this.getMapY() == i) {
            map[i][j] = 3;
            score++;
          }
        }
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
    key: "changeDirectionIfPossible",
    value: function changeDirectionIfPossible() {
      if (this.direction == this.nextDirection) return;
      var tempDirection = this.direction;
      this.direction = this.nextDirection;
      this.moveForwards();

      if (this.checkCollision()) {
        this.moveBackwards();
        this.direction = tempDirection;
      } else {
        this.moveBackwards();
      }
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
      ctx.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
      ctx.rotate(this.direction * 90 * Math.PI / 180);
      ctx.translate(-this.x - oneBlockSize / 2, -this.y - oneBlockSize / 2);
      ctx.drawImage(pacmanFrames, (this.currentFrame - 1) * oneBlockSize, 0, oneBlockSize, oneBlockSize, this.x, this.y, this.width, this.height);
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

  return Pacman;
}();