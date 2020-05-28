/**
 * Generate static files from our React component
 */
const async = require("async");
const utils = require("./utils.js");
const HTML = require("./templates/html.js");
const resolveCwd = require("resolve-cwd");
const fs = require("fs");
const getDataFromTree = require("@apollo/react-ssr").getDataFromTree;
const prerender = require("./prerender.js");

/**
 * Generate a collection of HTML markup based on
 * routes list of the main project
 */
const markupCollection = async () => {
  const routesPath = resolveCwd.silent("./build/routes.js");
  const promises = [];

  if (!routesPath) {
    throw new Error("No routes path can be found");
  }

  const routes = require(routesPath).default;

  routes.forEach((route) => {
    promises.push(prerender.preparePrerender(route, routes));
  });

  return Promise.all(promises).then((content) => {
    return content;
  });
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
const generateStatic = async (hashedFiles) => {
  return new Promise(async (resolve, reject) => {
    const collections = await markupCollection();
    console.log("whats", collections);
    async.each(
      collections,
      (file, cb) => {
        fs.writeFile(
          `./dist${file.path}.html`,
          HTML(
            file.markup,
            [assignAsset(`${file.name}.js`, hashedFiles), assignAsset(`hydrate.js`, hashedFiles)],
            file.initialState
          ),
          (e) => {
            if (e) {
              reject(new Error("Error in building static files"));
            }
            resolve(collections);
          }
        );

        cb();
      },
      (err) => {
        if (err) {
          reject(new Error("Failed to process a single file"));
        } else {
          resolve(collections);
        }
      }
    );
  });
};

module.exports = {
  generateStatic,
};
