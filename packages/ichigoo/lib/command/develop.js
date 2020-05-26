/**
 * Programatically start a parcel development server
 */

const Bundler = require("parcel-bundler");
const path = require("path");
const server = require("../server.js");
const utils = require("../ops/utils.js");

const develop = async () => {
  const bundle = new Bundler([path.join(utils.dir(), "index.html")], {
    watch: true,
    hmr: true,
  });

  await bundle.serve();
  await bundle.bundle();
  await server.graphQLServer();
};

module.exports = develop;
