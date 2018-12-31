const express = require("express");
const app = express();

app.set("view engine", "ejs");

let mode = "sequential";
let songs = [
  { name: "simple_blink", isActive: true },
  { name: "chain_blink", isActive: false }
];

app.get("/", (req, res) => {
  res.render("index", { mode, songs });
});

app.post("/dispatch/:action/:arg", (req, res) => {
  const action = req.params.action;
  const arg = req.params.arg;
  console.log("dispatch:", action, "arg:", arg);

  if (action === "mode") {
    mode = arg;
  }
  if (action === "play") {
    songs.forEach(song => {
      song.isActive = song.name === arg;
    });
  }
  res.redirect("/");
});

app.listen(8080);
