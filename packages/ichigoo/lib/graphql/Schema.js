"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = exports["default"] = void 0;

var _getSchemaFromData = _interopRequireDefault(require("./introspection/getSchemaFromData"));

var _graphqlTools = require("graphql-tools");

var _graphql = require("graphql");

var _resolver = _interopRequireDefault(require("./resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(data) {
  return (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: (0, _graphql.printSchema)((0, _getSchemaFromData["default"])(data)),
    resolvers: (0, _resolver["default"])(data),
    logger: {
      log: function log(e) {
        return console.log(e);
      }
    } // eslint-disable-line no-console

  });
};

exports["default"] = _default;

var typeDefs = function typeDefs(data) {
  return (0, _graphql.printSchema)((0, _getSchemaFromData["default"])(data));
};

exports.typeDefs = typeDefs;

var resolvers = function resolvers(data) {
  return (0, _resolver["default"])(data);
};

exports.resolvers = resolvers;