const fs = require("fs");
const fm = require("frontmatter");
const utils = require("./utils.js");
const path = require("path");

/**
 * Get all markdown content.
 * GraphQL typedefs and resolvers are going to be
 * automatically generated from this data.
 */
const getMarkdownSource = async () => {
  const items = await getMarkdownContent();

  return Promise.all(items).then((content) => {
    // TODO: have the key of this content configurable as well
    return { posts: content };
  });
};

/**
 * Represent each readFile call as a single promise.
 * Returns the promise array.
 *
 * @param {*} filenames - array of files in a directory
 */
const aggregateMarkdownContent = (filenames) => {
  const promises = [];
  let id = 0;

  filenames.forEach((filename) => {
    promises.push(
      new Promise((resolve, reject) => {
        fs.readFile(path.join(utils.dir(), `src/content/${filename}`), "utf8", (err, data) => {
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
 * Get markdown files from the source directory
 * and collect an array of promises representing
 * the call to get each content in a markdown file.
 */
const getMarkdownContent = () => {
  return new Promise(async (resolve, reject) => {
    // TODO: Have the source directory be specified in a config file
    // and read it from there
    fs.readdir(path.join(utils.dir(), "src/content"), async (err, filenames) => {
      if (err) {
        reject(err);
      }

      const promises = aggregateMarkdownContent(filenames);
      resolve(promises);
    });
  });
};

module.exports = {
  getMarkdownSource,
};
