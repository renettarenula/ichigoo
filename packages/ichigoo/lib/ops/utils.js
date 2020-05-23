const path = require("path");

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

module.exports = {
  dir,
  promiseResolver,
  timeout,
};
