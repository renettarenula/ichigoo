"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeNamesFromData = exports["default"] = void 0;

var _graphql = require("graphql");

var _inflection = require("inflection");

var _getFieldsFromEntities = _interopRequireDefault(require("./getFieldsFromEntities"));

var _nameConverter = require("../nameConverter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get a list of GraphQLObjectType from data
 * 
 * @example
 * const data = {
 *    "posts": [
 *        {
 *            "id": 1,
 *            "title": "Lorem Ipsum",
 *            "views": 254,
 *            "user_id": 123,
 *        },
 *        {
 *            "id": 2,
 *            "title": "Sic Dolor amet",
 *            "views": 65,
 *            "user_id": 456,
 *        },
 *    ],
 *    "users": [
 *        {
 *            "id": 123,
 *            "name": "John Doe"
 *        },
 *        {
 *            "id": 456,
 *            "name": "Jane Doe"
 *        }
 *    ],
 * };
 * const types = getTypesFromData(data);
 * // [
 * //     new GraphQLObjectType({
 * //         name: "Posts",
 * //         fields: {
 * //             id: { type: graphql.GraphQLString },
 * //             title: { type: graphql.GraphQLString },
 * //             views: { type: graphql.GraphQLInt },
 * //             user_id: { type: graphql.GraphQLString },
 * //         }
 * //     }),
 * //     new GraphQLObjectType({
 * //         name: "Users",
 * //         fields: {
 * //             id: { type: graphql.GraphQLString },
 * //             name: { type: graphql.GraphQLString },
 * //         }
 * //     }),
 * // ]
 */
var _default = function _default(data) {
  return Object.keys(data).map(function (typeName) {
    return {
      name: (0, _inflection.camelize)((0, _inflection.singularize)(typeName)),
      fields: (0, _getFieldsFromEntities["default"])(data[typeName])
    };
  }).map(function (typeObject) {
    return new _graphql.GraphQLObjectType(typeObject);
  });
};

exports["default"] = _default;

var getTypeNamesFromData = function getTypeNamesFromData(data) {
  return Object.keys(data).map(_nameConverter.getTypeFromKey);
};

exports.getTypeNamesFromData = getTypeNamesFromData;