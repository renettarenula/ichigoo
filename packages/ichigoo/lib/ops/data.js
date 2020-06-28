const getMarkdownSource = require("./markdown.js").getMarkdownSource;
var DataCollection = require("./collection").DataCollection;
const fs = require("fs");

const generateData = async () => {
  const collection = DataCollection.data();
  return new Promise(async (resolve, reject) => {
    fs.writeFile(`./src/data.graphql.json`, JSON.stringify(collection), (e) => {
      if (e) {
        reject(new Error(e));
      } else {
        resolve();
      }
    });
  });
};

const processInitialData = async () => {
  const markdown = await getMarkdownSource();
  DataCollection.add(markdown);
};

module.exports = { generateData, processInitialData };
