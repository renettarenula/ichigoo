#!/usr/bin/env ./node_modules/.bin/babel-node
console.log("Hello, world!");

var program = require("commander");
var resolveCwd = require("resolve-cwd");
var path = require("path");
var command = require("../plop/command.js");

program
  .command("test")
  .description("To test if we have access to Ichigoo command folder")
  .action(function () {
    console.log("this is run using babel");
    console.log(resolveCwd.silent("ichigoo/lib/command/new.js"));
  });

program.parse(process.argv);
