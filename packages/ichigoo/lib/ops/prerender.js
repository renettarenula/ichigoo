const getDataFromTree = require("@apollo/react-ssr").getDataFromTree;
const utils = require("./utils.js");
const resolveCwd = require("resolve-cwd");

/**
 * Run Apollo's getDataFromTree promise and once it resolves,
 * prerender markup and extract initial state for that markup.
 * Add addition information such as name and path in order to make
 * it easier to generate static files
 *
 * @param {*} route - a single route object representing the route that should be prerendered
 * @param {*} routes - a list of all the routes
 */
const preparePrerender = async (route, routes) => {
  const ssrPath = resolveCwd.silent("./build/src/ssr.js");

  if (!ssrPath) {
    throw new Error("No ssr path can be found");
  }

  const prerenderer = require(ssrPath);
  const client = await prerenderer.getClient();
  const markup = prerenderer.Markup;
  const prerender = prerenderer.default;

  return new Promise((resolve, reject) => {
    getDataFromTree(markup({ route, routes, client })).then(() => {
      const content = prerender(route, routes, client);
      const initialState = client.extract();

      resolve({
        markup: content,
        name: utils.capitalize(utils.getNameFromPath(route.path)),
        path: route.path,
        initialState: initialState,
      });
    });
  });
};

module.exports = { preparePrerender };
