"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _language = require("graphql/language");

var _default = new _graphql.GraphQLScalarType({
  name: 'Date',
  description: 'Date type',
  parseValue: function parseValue(value) {
    // value comes from the client
    return new Date(value); // sent to resolvers
  },
  serialize: function serialize(value) {
    // value comes from resolvers
    return value.toISOString(); // sent to the client
  },
  parseLiteral: function parseLiteral(ast) {
    // ast comes from parsing the query
    // this is where you can validate and transform
    if (ast.kind !== _language.Kind.STRING) {
      throw new _graphql.GraphQLError("Query error: Can only parse dates strings, got a: ".concat(ast.kind), [ast]);
    }

    if (isNaN(Date.parse(ast.value))) {
      throw new _graphql.GraphQLError("Query error: not a valid date", [ast]);
    }

    return new Date(ast.value);
  }
});

exports["default"] = _default;