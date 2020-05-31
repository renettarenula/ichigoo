const resolveCwd = require("resolve-cwd");

class Collection {
  constructor() {
    const cmd = resolveCwd.silent("./ichigoo-config.js");

    if (!cmd) {
      throw new Error("There's no config file");
    }

    const config = require(cmd);
    const metadata = config.siteMetadata;
    this.collection = Object.assign({}, { siteMetadata: [metadata] });
  }

  add(collection) {
    Object.assign(this.collection, collection);
  }

  data() {
    return this.collection;
  }
}

module.exports = Collection;
