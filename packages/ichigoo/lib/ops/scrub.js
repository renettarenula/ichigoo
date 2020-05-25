/**
 * Delete all files created during build
 */
const rimraf = require("rimraf");
const resolveCwd = require("resolve-cwd");
const fs = require("fs");
const utils = require("./utils.js");
const path = require("path");

const scrub = () => {
  const cmd = resolveCwd.silent("./build");
  return Promise.all([removeBuild(), removeFs()]);
};

/**
 * Remove build folder
 */
const removeBuild = () => {
  return new Promise(async (resolve, reject) => {
    rimraf("./build", () => {
      resolve();
    });
  });
};

/**
 * Remove hydrate and ssr files
 */
const removeFs = () => {
  return new Promise(async (resolve, reject) => {
    deleteMultiple(
      [
        path.join(utils.dir(), "src/hydrate.js"),
        path.join(utils.dir(), "src/ssr.js"),
      ],
      () => {
        resolve();
      }
    );
  });
};

/**
 * Remove array of files
 *
 * @param {*} files - array of files
 * @param {*} cb - callback
 */
const deleteMultiple = (files, cb) => {
  var file = files.pop();

  if (!file) {
    cb();
  } else {
    fs.unlink(file, () => {});
    deleteMultiple(files, cb);
  }
};

module.exports = scrub;
