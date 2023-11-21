"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require("express");

var mysql = require("mysql2");

var expressApp = express();

var dbConfig = require("../config/dbInfo.js");

var mysqlConnection = mysql.createPool(dbConfig);

var bodyParser = require("body-parser");

expressApp.set("view engine", "pug");
expressApp.set("views", "../views/pug");
expressApp.use(express["static"]("../static"));
expressApp.use(bodyParser.urlencoded({
  extended: true
}));
expressApp.locals.pretty = true;
var mysqlPromise = mysqlConnection.promise();
expressApp.get("/", function (req, res) {
  res.render("PacMan_index.pug");
});
expressApp.post("/play", function (req, res) {
  var name;

  if (req.body.name == "") {
    name = "Unknown";
  } else {
    name = req.body.name;
  }

  res.render("PacMan_play.pug", {
    level: parseInt(req.body.level),
    score: req.body.score,
    name: name
  });
});
expressApp.post("/lose", function _callee(req, res) {
  var saveScore, saveLevel, _ref, _ref2, result2;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          req.body.score.length == 1 && (saveScore = "0000" + req.body.score);
          req.body.score.length == 2 && (saveScore = "000" + req.body.score);
          req.body.score.length == 3 && (saveScore = "00" + req.body.score);
          req.body.score.length == 4 && (saveScore = "0" + req.body.score);
          req.body.score.length > 4 && (saveScore = req.body.score);
          req.body.level.length == 1 && (saveLevel = "00" + req.body.level);
          req.body.level.length == 2 && (saveLevel = "0" + req.body.level);
          req.body.level.length > 2 && (saveLevel = req.body.level);
          _context.next = 10;
          return regeneratorRuntime.awrap(mysqlPromise.query("INSERT INTO top_list (score, level, name) VALUES ('".concat(saveScore, "', '").concat(saveLevel, "', '").concat(req.body.name, "')")));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(mysqlPromise.query("SELECT score, level, name FROM top_list ORDER BY score DESC LIMIT 10"));

        case 12:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          result2 = _ref2[0];
          console.log(result2);
          res.render("PacMan_lose.pug", {
            level: parseInt(req.body.level),
            score: req.body.score,
            topInfo: result2,
            name: req.body.name
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});
expressApp.post("/next", function (req, res) {
  res.render("PacMan_next.pug", {
    level: parseInt(req.body.level) + 1,
    score: req.body.score,
    name: req.body.name
  });
});
expressApp.listen(3000, function () {
  console.log("port: 3000");
});