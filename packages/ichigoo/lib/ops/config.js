/**
 * Read and return config from main project's
 * ichigoo-config.js
 */
const resolveCwd = require("resolve-cwd");

const IchigooConfig = () => {
  const cmd = resolveCwd.silent("./ichigoo-config.js");

  if (!cmd) {
    throw new Error("There's no config file");
  }

  const config = require(cmd);
  return config;
};

module.exports = IchigooConfig;
