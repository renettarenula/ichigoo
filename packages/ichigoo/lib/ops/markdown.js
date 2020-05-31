const fs = require("fs");
const fm = require("frontmatter");
const utils = require("./utils.js");
const path = require("path");
const resolveCwd = require("resolve-cwd");

/**
 * Get all markdown content.
 * GraphQL typedefs and resolvers are going to be
 * automatically generated from this data.
 */
const getMarkdownSource = async () => {
  // do not start GQL server if content doesn't exist
  if (!fs.existsSync(path.join(utils.dir(), "src/content"))) {
    return;
  }

  const items = await getMarkdownContent();

  if (items.length > 0) {
    return Promise.all(items).then((content) => {
      const result = {};

      content.forEach((item) => {
        Object.assign(result, item);
      });

      return result;
    });
  } else {
    // resolve silently since markdowns are optional
    return Promise.resolve({});
  }
};

/**
 * Represent each readFile call as a single promise.
 * Returns the promise array.
 *
 * @param {*} mainPath - main path of markdown files
 * @param {*} filenames - array of files in a directory
 */
const aggregateMarkdownContent = (mainPath, filenames) => {
  const promises = [];
  let id = 0;

  filenames.forEach((filename) => {
    promises.push(
      new Promise((resolve, reject) => {
        fs.readFile(path.join(utils.dir(), `${mainPath}/${filename}`), "utf8", (err, data) => {
          if (err) {
            reject(err);
          }

          const meta = fm(data).data;
          resolve(Object.assign({}, { id: ++id }, { ...meta, content: fm(data).content }));
        });
      })
    );
  });

  return promises;
};

/**
 * Resolve promises of aggregateMarkdownContent in order to
 * read the content.
 *
 * @param {*} data - data of a single markdown option. Got this from ichigoo-config
 * @param {*} filename - name of file
 */
const resolveAggMarkdownContent = (data, filenames) => {
  return Promise.all(aggregateMarkdownContent(data.path, filenames)).then((markdownContent) => {
    const obj = {};
    obj[data.name] = markdownContent;
    return obj;
  });
};

/**
 * Get markdown files from the source directory
 * and collect an array of promises representing
 * the call to get each content in a markdown file.
 */
const getMarkdownContent = () => {
  const cmd = resolveCwd.silent(`./ichigoo-config.js`);
  const promises = [];

  const config = require(cmd);
  const markdown = config.options && config.options.markdown;

  if (!markdown) {
    return Promise.resolve([]);
  }

  markdown.forEach((data) => {
    promises.push(
      new Promise(async (resolve, reject) => {
        fs.readdir(path.join(utils.dir(), data.path), (err, filenames) => {
          if (err) {
            reject(err);
          }

          return resolveAggMarkdownContent(data, filenames).then((content) => {
            resolve(content);
          });
        });
      })
    );
  });

  return Promise.resolve(promises);
};

module.exports = {
  getMarkdownSource,
};
