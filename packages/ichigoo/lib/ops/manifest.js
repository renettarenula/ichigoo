/**
 * Parcel v1.x does not hash entry points. So, assets need to be added in a single entry
 * point for it to be hashed. This will create a new html file as an entry point with all
 * assets in it but we will just use it as manifest.
 */
const utils = require("./utils.js");
const path = require("path");
const fs = require("fs");
const markup = require("./markup.js");

/**
 * Generate hydration file and add it to main project
 */
const generateHydrate = () => {
  return new Promise((resolve, reject) => {
    fs.copyFile(
      path.join(__dirname, `./templates/hydrate.js`),
      path.join(utils.dir(), `src/hydrate.js`),
      (err) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve();
        }
      }
    );
  });
};

/**
 * Generate the manifest and add it to our main project
 */
const generateManifest = () => {
  return new Promise(async (resolve, reject) => {
    const [err, data] = await utils.promiseResolver(generateHydrate());
    if (err) reject(new Error(err));

    fs.readdir(path.join(utils.dir(), "./src/pages"), async (err, files) => {
      const scripts = files.map((file) => `./src/pages/${file}`);
      scripts.push("./src/hydrate.js");
      const HTML = await markup.createHTML(null, scripts);
      fs.writeFile(path.join(utils.dir(), "manifest.html"), HTML, (e) => {
        if (e) {
          reject(new Error("There is an issue in creating the manifest file."));
        } else {
          resolve();
        }
      });
    });
  });
};

module.exports = {
  generateManifest,
};
