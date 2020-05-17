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
    //console.log("resolver", path.resolve("."));
    command();
  });

program.parse(process.argv);
