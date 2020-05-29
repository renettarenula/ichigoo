/**
 * Generate static files from our React component
 */
const utils = require("./utils.js");
const resolveCwd = require("resolve-cwd");
const prerender = require("./prerender.js");
const dynamicRoutes = require("../../dist/index.js");
const match = require("path-to-regexp").match;

const getRoutes = () => {
  const routesPath = resolveCwd.silent("./build/routes.js");

  if (!routesPath) {
    throw new Error("No routes path can be found");
  }

  return require(routesPath).default;
};

/**
 * Generate a collection of HTML markup based on
 * routes list of the main project.
 */
const markupCollection = async () => {
  const promises = [];
  const routes = getRoutes();
  // separate dynamic and standard routes
  const standard = routes.filter((route) => !route.path.match(/:\w+/gm));

  standard.forEach((route) => {
    promises.push(prerender.preparePrerender(route, routes));
  });

  return Promise.all(promises).then((content) => {
    return content;
  });
};

/**
 * Generate a collection of HTML markup based on
 * dynamic routes list. We will also assign templates to it.
 *
 * dynamicRoutes.ALL_ROUTES will include standard routes.
 * So we need to filter it to include only dynamic routes.
 * An easy way is to compare it will the original routes list and
 * search for routes that are not listed in the original routes.
 * Dynamic routes will not be listed since it will be represented with
 * a colon (:). For example, /blog/my-first-post
 * will be represented as /blog/:slug in original route.
 *
 * Ideally, we should have some sort of a config file to handle
 * assigning templates to the routes but we can go with this as a PoC.
 */
const dynamicMarkupCollection = async () => {
  const promises = [];
  const routes = getRoutes();
  const paths = routes.map((item) => item.path);
  const recordedDynamic = dynamicRoutes.ALL_ROUTES.filter((item) => paths.indexOf(item) === -1);
  const aliases = routes.filter((route) => route.path.match(/:\w+/gm));
  const recordedDynamicList = [];

  recordedDynamic
    .map((item) => ({ path: item }))
    .forEach((item) => {
      aliases.forEach((route) => {
        const regmatch = match(route.path, { decode: decodeURIComponent });
        if (regmatch(item.path)) {
          recordedDynamicList.push(Object.assign(item, { name: route.name }));
        }
      });
    });

  recordedDynamicList.forEach((route) => {
    promises.push(prerender.preparePrerender(route, routes));
  });

  return Promise.all(promises).then((content) => {
    return content;
  });
};

/**
 *  Generate static HTML files
 *
 * @param {*} hashedFiles - Collection of bundled files with hash (e.g about.3453ed.js)
 */
const generateStatic = async (hashedFiles) => {
  return new Promise(async (resolve, reject) => {
    const collections = await markupCollection();
    const promises = [];

    collections.forEach(async (item) => {
      await utils.prepareDir(item.path);
      promises.push(prerender.prepareStatic(item, hashedFiles));
    });

    const dynamicCollections = await dynamicMarkupCollection();

    dynamicCollections.forEach(async (item) => {
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
