const path = require("path");
const chalk = require("chalk");

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
  const message = err
    ? chalk.red.bold(options.error)
    : chalk.green.bold(options.success);
  return spinner[spinType](message);
};

module.exports = {
  dir,
  promiseResolver,
  timeout,
  spinUtil,
};
