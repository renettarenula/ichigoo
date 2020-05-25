"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printSchemaForTypes = exports.printSchemaForFields = void 0;

var _graphql = require("graphql");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Return a schema string with a Main type using the fields
 * 
 * @param {*array} fields 
 * 
 * @example
 * printSchemaForFields({
 *     id: { type: graphql.GraphQLString },
 *     title: { type: graphql.GraphQLString },
 *     views: { type: graphql.GraphQLInt },
 *     user_id: { type: graphql.GraphQLString },
 * });
 * // type Main {
 * //   id: String
 * //   title: String
 * //   views: String
 * //   user_id: String
 * // }
 * //
 * // type Query {
 * //   foo: Main
 * // }
 */
var printSchemaForFields = function printSchemaForFields(fields) {
  var mainType = new _graphql.GraphQLObjectType({
    name: 'Main',
    fields: fields
  });
  var queryType = new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      foo: {
        type: mainType
      }
    }
  });
  var schema = new _graphql.GraphQLSchema({
    query: queryType
  });
  return (0, _graphql.printSchema)(schema);
};

exports.printSchemaForFields = printSchemaForFields;

var printSchemaForTypes = function printSchemaForTypes(types) {
  var typesSchema = types.reduce(function (schema, type) {
    schema[type.name] = type;
    return schema;
  }, {});
  var queryType = new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: types.reduce(function (fields, type) {
      fields[type.name] = {
        type: type
      };
      return fields;
    }, {})
  });
  var schema = new _graphql.GraphQLSchema(_objectSpread(_objectSpread({}, typesSchema), {}, {
    query: queryType
  }));
  return (0, _graphql.printSchema)(schema);
};

exports.printSchemaForTypes = printSchemaForTypes;