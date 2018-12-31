let controller = {};

try {
  const Gpio = require("onoff").Gpio;
  controller = {
    red: new Gpio(16, "out"),
    green: new Gpio(21, "out"),
    blue: new Gpio(20, "out"),
    yellow: new Gpio(12, "out")
  };
} catch (e) {
  console.log("Failed to initialize GPIO, falling back to mock");
  controller = {
    red: {
      writeSync: value => {
        console.log("Setting red to " + value);
      }
    },
    green: {
      writeSync: value => {
        console.log("Setting green to " + value);
      }
    },
    blue: {
      writeSync: value => {
        console.log("Setting blue to " + value);
      }
    },
    yellow: {
      writeSync: value => {
        console.log("Setting yellow to " + value);
      }
    }
  };
}

module.exports = controller;
