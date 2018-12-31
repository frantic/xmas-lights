const controller = require("./controller");

class Player {
  play(song) {
    this.stop();
    this.signal = { interrupted: false };
    run(song, this.signal);
  }

  stop() {
    if (this.signal) {
      this.signal.interrupted = true;
    }
  }
}

async function run(song, signal) {
  Object.keys(controller).forEach(color => {
    controller[color].writeSync(0);
  });
  let pc = 0;
  while (!signal.interrupted) {
    // loop
    if (pc >= song.length) {
      pc = 0;
    }
    const instr = song[pc];
    switch (instr.op) {
      case "delay":
        await delay(instr.arg);
        break;
      case "on":
        controller[instr.arg].writeSync(1);
        break;
      case "off":
        controller[instr.arg].writeSync(0);
        break;
    }
    pc++;
  }
}

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

module.exports = Player;
