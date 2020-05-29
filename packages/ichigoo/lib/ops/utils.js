const path = require("path");
const chalk = require("chalk");
const fse = require("fs-extra");

const dir = () => {
  return path.resolve(".");
};

const promiseResolver = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err]);
};

const timeout = (fn, ms) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn();
      resolve();
    }, ms)
  );
};

const spinUtil = (spinner, err, options) => {
  const spinType = err ? "fail" : "succeed";
  const message = err ? chalk.red.bold(options.error) : chalk.green.bold(options.success);
  return spinner[spinType](message);
};

const getNameFromPath = (path) => {
  if (path === "/") {
    return "index";
  } else {
    return path
      .split("/")
      .filter((str) => str.length > 0)
      .join("-");
  }
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Create directory if it doesn't exist.
 * We can form directory based on the path. For example,
 * for path: /blog/tag/javascript, directory will be /blog/tag
 *
 * @param {*} path - Path of a page
 */
const prepareDir = (path) => {
  const arr = path.split("/");
  const dir = arr.filter((item, index) => item.length > 0 && index !== arr.length - 1).join("/");

  if (dir.length === 0) {
    return;
  }

  return fse.ensureDir(`./dist/${dir}`);
};

/**
 * Simple utility to get asset
 *
 * @param {*} path - path of file
 * @param {*} basename - name of file act as key in order to get the hash files
 * @param {*} hashedFiles - Collection of bundled files with hash (e.g about.3453ed.js)
 */
const assignAsset = (path, basename, hashedFiles) => {
  const occurence = path.split("/").length - 1;
  let prefix = "";

  if (occurence === 1) {
    prefix = `./`;
  } else {
    for (let i = 0; i < occurence - 1; i++) {
      prefix += `../`;
    }
  }

  return `${prefix}${hashedFiles[basename]}`;
};

module.exports = {
  dir,
  promiseResolver,
  timeout,
  spinUtil,
  getNameFromPath,
  capitalize,
  prepareDir,
  assignAsset,
};
