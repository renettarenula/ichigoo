#!/usr/bin/env ./node_modules/.bin/babel-node
console.log("Hello, world!");

var program = require("commander");
var resolveCwd = require("resolve-cwd");

program
  .command("develop")
  .description("Start a development server")
  .action(function () {
    const cmdPath = resolveCwd.silent("ichigoo/lib/command/develop.js");

    if (cmdPath) {
      process.env.NODE_ENV = "development";
      const develop = require(cmdPath);
      develop();
    }
  });

program.parse(process.argv);
