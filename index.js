const express = require("express");
const app = express();

app.set("view engine", "ejs");

let mode = "sequential";

app.get("/", (req, res) => {
  res.render("index", { mode: mode });
});

app.post("/dispatch/:action", (req, res) => {
  const action = req.params.action;
  console.log("dispatch:", action);

  mode = action;
  res.redirect("/");
});

app.listen(8080);
