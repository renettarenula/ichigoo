const getDataFromTree = require("@apollo/react-ssr").getDataFromTree;
const utils = require("./utils.js");
const resolveCwd = require("resolve-cwd");
const fs = require("fs").promises;
const markup = require("./markup.js");

/**
 * Run Apollo's getDataFromTree promise and once it resolves,
 * prerender markup and extract initial state for that markup.
 * Add addition information such as name and path in order to make
 * it easier to generate static files.
 *
 * Returns a promise
 *
 * @param {*} route - a single route object representing the route that should be prerendered
 * @param {*} routes - a list of all the routes
 */
const preparePrerender = async (route, routes, context = {}) => {
  const ssrPath = resolveCwd.silent("./build/src/ssr.js");

  if (!ssrPath) {
    throw new Error("No ssr path can be found");
  }

  const prerenderer = require(ssrPath);
  const client = await prerenderer.getClient();
  const markup = prerenderer.Markup;
  const prerender = prerenderer.default;

  return new Promise((resolve, reject) => {
    getDataFromTree(markup({ route, routes, client, context })).then(() => {
      const content = prerender(route, routes, client, context);
      const initialState = client.extract();

      resolve({
        markup: content,
        name: route.name,
        path: route.path,
        initialState: initialState,
      });
    });
  });
};

/**
 * Get ApolloClient object created during build time
 *
 * TODO: Refactor and create a class to access SSR.
 * Makes it much simpler and less repetition
 */
const apolloClient = () => {
  const ssrPath = resolveCwd.silent("./build/src/ssr.js");

  if (!ssrPath) {
    throw new Error("No ssr path can be found");
  }

  const prerenderer = require(ssrPath);
  return prerenderer.getClient();
};

/**
 * A function that can be used to programatically create pages
 *
 * @param {*} hashedFiles - Collection of bundled files with hash (e.g about.3453ed.js)
 */
const createPage = (routes, hashedFiles) => {
  return {
    createPage: async ({ route, context }) => {
      const item = await preparePrerender(route, routes, context);
      await utils.prepareDir(item.path);
      await prepareStatic(item, hashedFiles);
    },
  };
};

/**
 * Generate pages based on configuration under ichigoo-node.js
 *
 * @param {*} routes - a list of all the routes
 * @param {*} hashedFiles - hashed assets created by parcel
 */
const prepareCreatedPages = async (routes, hashedFiles) => {
  const pageconf = resolveCwd.silent("./ichigoo-node.js");
  // do nothing if there's no ichigoo-node file
  if (!pageconf) {
    return;
  }

  const client = await apolloClient();
  const ichinode = require(pageconf);
  const create = createPage(routes, hashedFiles).createPage;

  await ichinode.createPages(client, create);
};

/**
 * Generate static file using fs.
 *
 * Returns a promise
 *
 * @param {*} route - a single route object created and returned by preparePrerender.
 * @param {*} hashedFiles - hashed assets created by parcel
 */
const prepareStatic = async (route, hashedFiles) => {
  const markup = await prepareHTML(route, hashedFiles);
  // handling index path
  const file = route.path === "/" ? "/index" : route.path;
  return fs.writeFile(`./dist${file}.html`, markup);
};

/**
 *
 * @param {*} route - a single route object created and returned by preparePrerender.
 * @param {*} hashedFiles - hashed assets created by parcel
 */
const prepareHTML = (route, hashedFiles) => {
  return markup.createHTML(
    route.markup,
    [
      utils.assignAsset(route.path, `${route.name}.js`, hashedFiles),
      utils.assignAsset(route.path, `hydrate.js`, hashedFiles),
    ],
    route.initialState,
    hashedFiles
  );
};

module.exports = { preparePrerender, prepareStatic, prepareCreatedPages };
