var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
var utils = require("./ops/utils.js");
var chalk = require("chalk");

const server = () => {
  var app = express();
  app.use(
    serveStatic(path.join(utils.dir(), "dist"), { extensions: ["html"] })
  );

  var port = process.env.PORT || 5000;
  app.listen(port);

  console.log(chalk.cyan.bold("Start server at port 5000"));
};

module.exports = server;
