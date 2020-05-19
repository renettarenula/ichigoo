#!/usr/bin/env node

/**
 * We are requiring the CLI here so that we can easily
 * resolve path from our current working directory so that we
 * can use and require modules easily within our CLI.
 * Check usage of resolve-cwd in CLI code to see how it works.
 */
const test = require("ichigoo-cli/lib/bin/index.js");
