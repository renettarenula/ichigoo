const path = require("path");
const transpile = require("../ops/transpile.js");
const ora = require("ora");
const chalk = require("chalk");

const directory = path.resolve(".");

const build = async () => {
  const spinner = ora(chalk.grey.bold("Transpiling source files")).start();

  await transpile.transformDir(
    path.join(directory, "src"),
    path.join(directory, "build/src")
  );

  await transpile.transform(
    "routes.js",
    path.join(directory),
    path.join(directory, "build")
  );

  setTimeout(() => {
    spinner.succeed(chalk.green.bold("Source files transpiled!"));
  }, 2000);
};

module.exports = build;
