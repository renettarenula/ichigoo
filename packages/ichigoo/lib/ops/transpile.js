/**
 * Original code from here: https://github.com/kaelzhang/babel-transform-dir
 * Modified by yours truly (http://aysha.me/)
 */
const globby = require("globby");
const path = require("path");
const fs = require("fs-extra");
const babel = require("@babel/core");

/**
 * Transpile folder of files using Babel
 *
 * @param {*} src - Source folder of files to be transformed or transpiled
 * @param {*} dest - The destination to output the transpiled file
 * @param {*} options - Babel options. See the full list here: https://babeljs.io/docs/en/options
 */
const transformDir = (src, dest, options) => {
  src = path.resolve(src);
  dest = path.resolve(dest);

  function t(file) {
    return transform(file, src, dest, {
      filename: file,
      ...options,
    });
  }

  return globby("**/*.js", {
    cwd: src,
  }).then((files) => {
    return Promise.all(files.map(t));
  });
};

/**
 * Transpile a single file using Babel.
 *
 * @param {*} file - File to be transformed or transpiled
 * @param {*} src - Source folder where the main file originated from
 * @param {*} dest - The destination to output the transpiled file
 * @param {*} opt - Babel options. See the full list here: https://babeljs.io/docs/en/options
 */
async function transform(file, src, dest, opt) {
  const filepath = path.join(src, file);
  const content = await fs.readFile(filepath);
  const destpath = path.join(dest, file);

  const { code } = babel.transform(content.toString(), {
    ...opt,
    filename: file,
  });

  return fs.outputFile(destpath, code);
}

module.exports = {
  transform,
  transformDir,
};
