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
    this.direction = 4;
    this.nextDirection = 4;
    this.frameCount = 7;
    this.currentFrame = 1;
    this.mode = 0;
    setInterval(function () {
      _this.changeAnimation();
    }, 100);
  }

  _createClass(Pacman, [{
    key: "moveProcess",
    value: function moveProcess() {
      this.changeDirectionIfPossible();
      this.moveForwards();

      if (this.checkCollisions()) {
        this.moveBackwards();
        return;
      }
    }
  }, {
    key: "eat",
    value: function eat() {
      var _this2 = this;

      for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
          if (map[i][j] == 6 && this.getMapX() == j && this.getMapY() == i) {
            map[i][j] = 3;
            score++;
            this.mode++;
            ghostFrames.src = "./img/ghostS.png";
            map[9][10] = 1;
            setTimeout(function () {
              _this2.mode--;

              if (!_this2.mode) {
                ghostFrames.src = "./img/ghost.png";
                map[9][10] = blockInfo;
              }
            }, 10000);
          }

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
    key: "checkCollisions",
    value: function checkCollisions() {
      var isCollided = false;

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 4) {
        this.x = 380;
      }

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 5) {
        this.x = 20;
      }

      if (map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] == 1 || map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize)] == 1 || map[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize + 0.9999)] == 1 || map[parseInt(this.y / oneBlockSize + 0.9999)][parseInt(this.x / oneBlockSize + 0.9999)] == 1) {
        isCollided = true;
      }

      return isCollided;
    }
  }, {
    key: "checkGhostCollision",
    value: function checkGhostCollision(ghosts) {
      for (var i = 0; i < ghosts.length; i++) {
        var ghost = ghosts[i];

        if (ghost.getMapX() == this.getMapX() && ghost.getMapY() == this.getMapY()) {
          if (this.mode) {
            ghost.x = 9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize;
            ghost.y = 10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize;
          }

          return true;
        }
      }

      return false;
    }
  }, {
    key: "changeDirectionIfPossible",
    value: function changeDirectionIfPossible() {
      if (this.direction == this.nextDirection) return;
      var tempDirection = this.direction;
      this.direction = this.nextDirection;
      this.moveForwards();

      if (this.checkCollisions()) {
        this.moveBackwards();
        this.direction = tempDirection;
      } else {
        this.moveBackwards();
      }
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
      canvasContext.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
      canvasContext.rotate(this.direction * 90 * Math.PI / 180);
      canvasContext.translate(-this.x - oneBlockSize / 2, -this.y - oneBlockSize / 2);
      canvasContext.drawImage(pacmanFrames, (this.currentFrame - 1) * oneBlockSize, 0, oneBlockSize, oneBlockSize, this.x, this.y, this.width, this.height);
      canvasContext.restore();
    }
  }]);

  return Pacman;
}();