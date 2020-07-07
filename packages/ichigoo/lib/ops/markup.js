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
const createHTML = async (component, scripts, initialState, completeHash) => {
  const HTMLData = await getHTMLContent();
  const dependencies = scripts.map((script) => `<script src="${script}" defer></script>`);

  const $ = cheerio.load(HTMLData);

  /** Handle custom CSS and JS added under project's index.html */
  if (completeHash) {
    $("script").each((i, elem) => {
      const src = $(elem).attr("src");
      const name = `${utils.getNameFromTemplate(src)}.js`;
      $(elem).attr("src", completeHash[name]);
    });

    $("link").each((i, elem) => {
      const href = $(elem).attr("href");
      const name = `${utils.getNameFromTemplate(href)}.css`;
      $(elem).attr("href", completeHash[name]);
    });
  }

  if (component) {
    $("#content").prepend(`${component}`);
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

  if (dependencies.length > 0) {
    $("script")
      .eq(0)
      .after(`${dependencies.join("")}`);
  }

  return $.html();
};

module.exports = {
  createHTML,
};
