const express = require("express");
const mysql = require("mysql2");
const expressApp = express();
const dbConfig = require("../config/dbInfo.js");
const mysqlConnection = mysql.createPool(dbConfig);
const bodyParser = require("body-parser");
expressApp.set("view engine", "pug");
expressApp.set("views", "../views/pug");
expressApp.use(express.static("../static"));
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.locals.pretty = true;
const mysqlPromise = mysqlConnection.promise();
expressApp.get("/", (req, res) => {
  res.render("PacMan_index.pug");
});
expressApp.post("/play", (req, res) => {
  let name;
  if (req.body.name == "") {
    name = "Unknown";
  } else {
    name = req.body.name;
  }
  res.render("PacMan_play.pug", {
    level: parseInt(req.body.level),
    score: req.body.score,
    name: name,
  });
});
expressApp.post("/lose", async (req, res) => {
  let saveScore;
  let saveLevel;
  req.body.score.length == 1 && (saveScore = "0000" + req.body.score);
  req.body.score.length == 2 && (saveScore = "000" + req.body.score);
  req.body.score.length == 3 && (saveScore = "00" + req.body.score);
  req.body.score.length == 4 && (saveScore = "0" + req.body.score);
  req.body.score.length > 4 && (saveScore = req.body.score);
  req.body.level.length == 1 && (saveLevel = "00" + req.body.level);
  req.body.level.length == 2 && (saveLevel = "0" + req.body.level);
  req.body.level.length > 2 && (saveLevel = req.body.level);
  await mysqlPromise.query(
    `INSERT INTO top_list (score, level, name) VALUES ('${saveScore}', '${saveLevel}', '${req.body.name}')`
  );
  let [result2] = await mysqlPromise.query(
    `SELECT score, level, name FROM top_list ORDER BY score DESC LIMIT 10`
  );
  console.log(result2);
  res.render("PacMan_lose.pug", {
    level: parseInt(req.body.level),
    score: req.body.score,
    topInfo: result2,
    name: req.body.name,
  });
});
expressApp.post("/next", (req, res) => {
  res.render("PacMan_next.pug", {
    level: parseInt(req.body.level) + 1,
    score: req.body.score,
    name: req.body.name,
  });
});
expressApp.listen(3000, () => {
  console.log("port: 3000");
});
