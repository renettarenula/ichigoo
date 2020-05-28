/**
 * Generate static files from our React component
 */
const utils = require("./utils.js");
const resolveCwd = require("resolve-cwd");
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
    const promises = [];

    console.log("debugger", collections);

    collections.forEach(async (item) => {
      await utils.prepareDir(item.path);
      promises.push(prerender.prepareStatic(item, hashedFiles));
    });

    Promise.all(promises)
      .then(() => {
        resolve(collections);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  generateStatic,
};
