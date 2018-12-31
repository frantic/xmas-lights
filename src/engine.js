const fs = require("fs");
const path = require("path");
const song = require("./song");
const Player = require("./player");

class Engine {
  constructor(songsDir) {
    this.songsDir = songsDir;
    this.mode = "sequential";
    this.currentSongName = null;
    this.player = new Player();
    this.songs = fs.readdirSync(this.songsDir);
    fs.watch(this.songsDir, (eventType, fileName) => {
      console.log("fs event:", eventType, fileName);
      if (eventType === "change") {
        if (fileName === this.currentSongName && this.mode != "pause") {
          this.play(fileName);
        }
      } else {
        this.songs = fs.readdirSync(this.songsDir);
      }
    });
    this.next();
  }

  setMode(mode) {
    if (this.mode != "pause" && mode == "pause") {
      // Pause
      this.player.stop();
    }
    if (this.mode == "pause" && mode != "pause") {
      // Resume
      this.play(this.currentSongName);
    }
    this.mode = mode;
  }

  play(name) {
    if (this.mode == "pause") {
      this.mode = "sequential";
    }
    this.currentSongName = name;
    const source = fs.readFileSync(path.join(this.songsDir, name), "utf8");
    const code = song.compile(source);
    this.player.play(code);
  }

  next() {
    const songName = this.nextSongName();
    this.play(songName);
  }

  nextSongName() {
    switch (this.mode) {
      case "sequential":
        const nextIndex =
          (this.songs.indexOf(this.currentSongName) + 1) % this.songs.length;
        return this.songs[nextIndex];
      case "random":
        const randomIndex = Math.floor(Math.random() * this.songs.length);
        return this.songs[randomIndex];
      case "repeat":
        return this.currentSongName;
      case "pause":
        return this.currentSongName;
    }
  }
}

module.exports = Engine;
