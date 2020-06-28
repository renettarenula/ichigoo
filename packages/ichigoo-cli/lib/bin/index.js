#!/usr/bin/env node
console.log("Hello, world!");

var program = require("commander");
var resolveCwd = require("resolve-cwd");
var path = require("path");
var command = require("../plop/command.js");

program
  .command("new")
  .description("Generate a new Ichigoo project")
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

program
  .command("build")
  .description("Start building the static site for production")
  .action(function () {
    const cmdPath = resolveCwd.silent("ichigoo/lib/command/build.js");
    if (cmdPath) {
      process.env.NODE_ENV = "production";
      const build = require(cmdPath);
      build();
    }
  });

program
  .command("serve")
  .description("Serve production site on local dev")
  .action(function () {
    const cmdPath = resolveCwd.silent("ichigoo/lib/command/serve.js");
    if (cmdPath) {
      process.env.NODE_ENV = "production";
      const serve = require(cmdPath);
      serve.serve();
    }
  });

program
  .command("gql")
  .description("Serve graphql server on local dev")
  .action(function () {
    const cmdPath = resolveCwd.silent("ichigoo/lib/command/serve.js");
    if (cmdPath) {
      process.env.NODE_ENV = "development";
      const serve = require(cmdPath);
      serve.gql();
    }
  });

program.parse(process.argv);
