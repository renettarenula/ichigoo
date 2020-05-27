/**
 * Generate static files from our React component
 */
const async = require("async");
const utils = require("./utils.js");
const HTML = require("./templates/html.js");
const resolveCwd = require("resolve-cwd");
const fs = require("fs");
/**
 * Generate a collection of HTML markup based on
 * routes list of the main project
 */
const markupCollection = () => {
  const routesPath = resolveCwd.silent("./build/routes.js");
  const ssrPath = resolveCwd.silent("./build/src/ssr.js");

  const collection = {};

  if (!routesPath || !ssrPath) {
    throw new Error("No routes path can be found");
  }

  const routes = require(routesPath).default;
  const SSR = require(ssrPath).default;

  routes.forEach((route) => {
    collection[utils.getNameFromPath(route.path)] = {
      markup: SSR(route, routes),
      name: utils.capitalize(utils.getNameFromPath(route.path)),
      path: route.path,
    };
  });

  return collection;
};

/**
 * Simple utility to get asset
 *
 * @param {*} basename - name of file act as key in order to get the hash files
 * @param {*} hashedFiles - Collection of bundled files with hash (e.g about.3453ed.js)
 */
const assignAsset = (basename, hashedFiles) => {
  return `./${hashedFiles[basename]}`;
};

// TODO: Handle directory URL like this:
// aysha.me/post/first-post.html
/**
 *  Generate static HTML files
 *
 * @param {*} hashedFiles - Collection of bundled files with hash (e.g about.3453ed.js)
 */
const generateStatic = (hashedFiles) => {
  return new Promise((resolve, reject) => {
    async.each(
      markupCollection(),
      (file, cb) => {
        fs.writeFile(
          `./dist/${file.name}.html`,
          HTML(file.markup, [
            assignAsset(`${file.name}.js`, hashedFiles),
            assignAsset(`hydrate.js`, hashedFiles),
          ]),
          (e) => {
            if (e) {
              reject(new Error("Error in building static files"));
            }
            resolve(markupCollection());
          }
        );

        cb();
      },
      (err) => {
        if (err) {
          reject(new Error("Failed to process a single file"));
        } else {
          resolve(markupCollection());
        }
      }
    );
  });
};

module.exports = {
  generateStatic,
};
