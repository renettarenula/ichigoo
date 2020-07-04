/**
 * Handle index.html on our main project files.
 * We are copying the index.html and appending dependencies
 * as well as the data of our app in order to handle
 * pre-rendering (for SPA). This index.html will be used to
 * build static HTML and manifest files.
 */

const utils = require("./utils.js");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");
const fsp = fs.promises;

/**
 * Get the HTML content by reading index.html from our
 * main project.
 */
const getHTMLContent = async () => {
  const source = path.join(utils.dir(), `index.html`);
  const [err, data] = await utils.promiseResolver(fsp.readFile(source, "utf8"));

  if (err) reject(err);
  return data;
};

/**
 * Process HTML by adding components, dependencies and app state
 */
const createHTML = async (component, scripts, initialState) => {
  const HTMLData = await getHTMLContent();
  const dependencies = scripts.map((script) => `<script src="${script}" async></script>`);

  const $ = cheerio.load(HTMLData);

  if (component) {
    $("body").prepend(`<div id="ichigoo-content">${component}</div>`);
  }

  if (dependencies.length > 0) {
    $("body").append(`${dependencies.join("")}`);
  }

  if (initialState) {
    $("body").append(
      `${
        initialState &&
        `<script type="text/javascript">window.__APOLLO_STATE__ = ${JSON.stringify(
          initialState
        ).replace(/</g, "\\u003c")}</script>`
      }`
    );
  }

  return $.html();
};

module.exports = {
  createHTML,
};
