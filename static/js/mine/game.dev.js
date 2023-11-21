"use strict";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pacmanFrames = document.getElementById("animations");
var ghostFrames = document.getElementById("ghosts");

var createRect = function createRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1], [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1], [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1], [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1], [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1], [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1], [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

var gameLoop = function gameLoop() {
  update();
  draw();
};

var update = function update() {
  pacman.moveProcess();
  pacman.eat();

  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].moveProcess();
  }
};

var drawFoods = function drawFoods() {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[0].length; j++) {
      if (map[i][j] == 2) {
        createRect(j * oneBlockSize + oneBlockSize / 3, i * oneBlockSize + oneBlockSize / 3, oneBlockSize / 3, oneBlockSize / 3, "white");
      }
    }
  }
};

var drawScore = function drawScore() {
  ctx.font = "20px, Press Start 2P";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 0, oneBlockSize * (map.length + 1) + 10);
};

var drawGhosts = function drawGhosts() {
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].draw();
  }
};

var draw = function draw() {
  createRect(0, 0, canvas.width, canvas.height, "black");
  drawWalls();
  drawFoods();
  pacman.draw();
  drawScore();
  drawGhosts();
};

var fps = 30;
var gameInterval = setInterval(gameLoop, 1000 / fps);
var wallColor = "#342DCA";
var score = 0;
var ghosts = [];
var ghostCount = 4;
var oneBlockSize = 20;
var wallSpaceWidth = oneBlockSize / 1.6;
var wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 3;
var DIRECTION_LEFT = 2;
var DIRECTION_BOTTOM = 1;
var randomTargetsForGhosts = [{
  x: 1 * oneBlockSize,
  y: 1 * oneBlockSize
}, {
  x: 1 * oneBlockSize,
  y: (map.length - 2) * oneBlockSize
}, {
  x: (map[0].length - 2) * oneBlockSize,
  y: oneBlockSize
}, {
  x: (map[0].length - 2) * oneBlockSize,
  y: (map.length - 2) * oneBlockSize
}];
var ghostLocation = [{
  x: 0,
  y: 0
}, {
  x: 176,
  y: 0
}, {
  x: 0,
  y: 121
}, {
  x: 176,
  y: 121
}];

var drawWalls = function drawWalls() {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[0].length; j++) {
      if (map[i][j] == 1) {
        createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, wallColor);

        if (j > 0 && map[i][j - 1] == 1) {
          createRect(j * oneBlockSize, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, "black");
        }

        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, "black");
        }

        if (i > 0 && map[i - 1][j] == 1) {
          createRect(j * oneBlockSize + wallOffset, i * oneBlockSize, wallSpaceWidth, wallSpaceWidth + wallOffset, "black");
        }

        if (i < map.length - 1 && map[i + 1][j] == 1) {
          createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth, wallSpaceWidth + wallOffset, "black");
        }
      }
    }
  }
};

var createNewPacman = function createNewPacman() {
  pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize / 5);
};

var createGhosts = function createGhosts() {
  //ghosts = [];
  for (var i = 0; i < ghostCount; i++) {
    var newGhost = new Ghost(9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize, 10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize, oneBlockSize, oneBlockSize, pacman.speed / 2, ghostLocation[i % 4].x, ghostLocation[i % 4].y, 124, 116, 6 + i);
    ghosts.push(newGhost);
  }
};

createNewPacman();
gameLoop();
createGhosts();
window.addEventListener("keydown", function (e) {
  var keyCodeValue = e.key;
  setTimeout(function () {
    if (keyCodeValue == 37 || keyCodeValue == "ArrowLeft" || keyCodeValue == 65 || keyCodeValue == "KeyA") {
      pacman.nextDirection = DIRECTION_LEFT;
    } else if (keyCodeValue == 38 || keyCodeValue == "ArrowUp" || keyCodeValue == 87 || keyCodeValue == "KeyW") {
      pacman.nextDirection = DIRECTION_UP;
    } else if (keyCodeValue == 39 || keyCodeValue == "ArrowRight" || keyCodeValue == 68 || keyCodeValue == "KeyD") {
      pacman.nextDirection = DIRECTION_RIGHT;
    } else if (keyCodeValue == 40 || keyCodeValue == "ArrowDown" || keyCodeValue == 83 || keyCodeValue == "KeyS") {
      pacman.nextDirection = DIRECTION_BOTTOM;
    }
  }, 1);
});