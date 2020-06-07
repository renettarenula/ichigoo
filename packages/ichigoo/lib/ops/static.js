/**
 * Generate static files from our React component
 */
const utils = require("./utils.js");
const resolveCwd = require("resolve-cwd");
const prerender = require("./prerender.js");
const match = require("path-to-regexp").match;
const DataCollection = require("./collection").DataCollection;
const IchigooConfig = require("./config.js");

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
 * markdown slugs. Traverse through all of the markdown files,
 * get the slugs, and prepare prerender data based on it.
 */
const dynamicMarkupCollection = async () => {
  const config = IchigooConfig();
  const markdown = config.options && config.options.markdown;
  const promises = [];
  const routes = getRoutes();
  const recordedDynamicList = [];

  if (!markdown) {
    return Promise.resolve([]);
  }

  markdown.forEach((item) => {
    const collections = DataCollection.data()[item.name];
    collections.forEach((collection) => {
      recordedDynamicList.push(
        Object.assign({}, { path: collection.slug, name: utils.getNameFromTemplate(item.template) })
      );
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

    if (dynamicCollections.length > 0) {
      dynamicCollections.forEach(async (item) => {
        await utils.prepareDir(item.path);
        promises.push(prerender.prepareStatic(item, hashedFiles));
      });
    }

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
