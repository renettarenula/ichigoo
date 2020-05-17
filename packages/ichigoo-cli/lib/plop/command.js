const path = require("path");
const args = process.argv.slice(2);
const { Plop, run } = require("plop");
const argv = require("minimist")(args);

function runPlop() {
  Plop.launch(
    {
      cwd: argv.cwd,
      configPath: path.join(__dirname, "./plopfile.js"),
      require: argv.require,
      completion: argv.completion,
    },
    run
  );
}

module.exports = runPlop;
