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
  let pc = 0;
  while (!signal.interrupted) {
    // loop
    if (pc >= song.length) {
      pc = 0;
    }
    const instr = song[pc];
    switch (instr.op) {
      case "delay":
        console.log("Delay " + instr.arg);
        await delay(instr.arg);
        break;
      case "on":
        console.log("Turning ON " + instr.arg);
        break;
      case "off":
        console.log("Turning OFF " + instr.arg);
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
