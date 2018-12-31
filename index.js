const path = require("path");
const express = require("express");
const app = express();
const Engine = require("./src/engine");

const songsDir = path.join(__dirname, "songs");
const engine = new Engine(songsDir);

// To avoid messing with PWD from /etc/rc.local
process.chdir(__dirname);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    mode: engine.mode,
    songs: engine.songs.map(name => ({
      name,
      isActive: engine.currentSongName === name
    }))
  });
});

app.post("/dispatch/:action/:arg", (req, res) => {
  const action = req.params.action;
  const arg = req.params.arg;
  console.log("dispatch:", action, "arg:", arg);

  if (action === "mode") {
    engine.setMode(arg);
  }
  if (action === "play") {
    engine.play(arg);
  }
  res.redirect("/");
});

app.listen(8080);
