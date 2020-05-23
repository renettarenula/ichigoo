const path = require("path");
const transpile = require("../ops/transpile.js");
const manifest = require("../ops/manifest.js");
const ora = require("ora");
const chalk = require("chalk");

const directory = path.resolve(".");
const utils = require("../ops/utils.js");

const build = async () => {
  let spinner = ora(chalk.grey.bold("Transpiling source files")).start();

  await transpile.transformDir(
    path.join(directory, "src"),
    path.join(directory, "build/src")
  );

  await transpile.transform(
    "routes.js",
    path.join(directory),
    path.join(directory, "build")
  );

  await utils.timeout(() => {
    spinner.succeed(chalk.green.bold("Source files transpiled!"));
  }, 2000);

  spinner = ora(chalk.grey.bold("Generating manifest")).start();
  const [err, data] = await utils.promiseResolver(manifest.generateManifest());

  await utils.timeout(() => {
    if (err) {
      spinner.fail(chalk.red.bold(`Trouble generating manifest - ${err}`));
    } else {
      spinner.succeed(chalk.green.bold("Manifest created!"));
    }
  }, 2000);
};

module.exports = build;
