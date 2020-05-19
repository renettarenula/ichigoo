#!/usr/bin/env node
console.log("Hello, world!");

var program = require("commander");
var resolveCwd = require("resolve-cwd");
var path = require("path");
var command = require("../plop/command.js");

program
  .command("new") // sub-command name
  .description("Generate a new Ichigoo project") // command description

  // function to execute when command is uses
  .action(function () {
    command();
  });

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
