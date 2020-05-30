const getMarkdownSource = require("./markdown.js").getMarkdownSource;
const fs = require("fs");

const generateData = async () => {
  const markdown = await getMarkdownSource();
  return new Promise(async (resolve, reject) => {
    fs.writeFile(`./src/data.graphql.json`, JSON.stringify(markdown), (e) => {
      if (e) {
        reject(new Error(e));
      } else {
        resolve();
      }
    });
  });
};

module.exports = { generateData };
