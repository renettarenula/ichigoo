const path = require("path");
const transpile = require("../ops/transpile.js");
const manifest = require("../ops/manifest.js");
const ora = require("ora");
const chalk = require("chalk");
const Bundler = require("parcel-bundler");
const directory = path.resolve(".");
const utils = require("../ops/utils.js");

/**
 * Transpile main project and routes so that we can
 * access and execute ES6 code when we want to create the static HTML
 */
const transpileSource = async () => {
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

  await utils.timeout(() => {
    spinner.succeed(chalk.green.bold("Source files transpiled!"));
  }, 2000);
};

/**
 * Generate manifest file
 */
const createManifest = async () => {
  const spinner = ora(chalk.grey.bold("Generating manifest")).start();
  const [err, data] = await utils.promiseResolver(manifest.generateManifest());

  await utils.timeout(() => {
    utils.spinUtil(spinner, err, {
      error: `Trouble generating manifest - ${err}`,
      success: "Manifest created!",
    });
  }, 2000);
};

/**
 * Bundle manifest and create static file
 */
const runBundle = async () => {
  return new Promise(async (resolve, reject) => {
    const bundling = new Bundler([path.join(utils.dir(), "./manifest.html")], {
      watch: false,
    });

    bundling.on("bundled", async (bundle) => {
      const hashedCollections = {};

      for (let asset of bundle.childBundles) {
        hashedCollections[asset.entryAsset.basename] = asset.name.match(
          /[^\\/]+$/
        )[0];
      }
    });

    const bundle = await bundling.bundle();
  });
};

const build = async () => {
  await transpileSource();
  await createManifest();
  await runBundle();
};

module.exports = build;
