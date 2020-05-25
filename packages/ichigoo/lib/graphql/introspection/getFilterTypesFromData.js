"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _getFieldsFromEntities = _interopRequireDefault(require("./getFieldsFromEntities"));

var _getValuesFromEntities = _interopRequireDefault(require("./getValuesFromEntities"));

var _getTypeFromValues = _interopRequireDefault(require("./getTypeFromValues"));

var _nameConverter = require("../nameConverter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getRangeFiltersFromEntities = function getRangeFiltersFromEntities(entities) {
  var fieldValues = (0, _getValuesFromEntities["default"])(entities);
  return Object.keys(fieldValues).reduce(function (fields, fieldName) {
    var fieldType = (0, _getTypeFromValues["default"])(fieldName, fieldValues[fieldName], false);

    if (fieldType == _graphql.GraphQLInt || fieldType == _graphql.GraphQLFloat || fieldType.name == 'Date') {
      fields["".concat(fieldName, "_lt")] = {
        type: fieldType
      };
      fields["".concat(fieldName, "_lte")] = {
        type: fieldType
      };
      fields["".concat(fieldName, "_gt")] = {
        type: fieldType
      };
      fields["".concat(fieldName, "_gte")] = {
        type: fieldType
      };
    }

    return fields;
  }, {});
};
/**
 * Get a list of GraphQLObjectType for filtering data
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
 * const types = getFilterTypesFromData(data);
 * // {
 * //     posts: new GraphQLInputObjectType({
 * //         name: "PostFilter",
 * //         fields: {
 * //             q: { type: GraphQLString },
 * //             id: { type: GraphQLString },
 * //             title: { type: GraphQLString },
 * //             views: { type: GraphQLInt },
 * //             views_lt: { type: GraphQLInt },
 * //             views_lte: { type: GraphQLInt },
 * //             views_gt: { type: GraphQLInt },
 * //             views_gte: { type: GraphQLInt },
 * //             user_id: { type: GraphQLString },
 * //         }
 * //     }),
 * //     users: new GraphQLObjectType({
 * //         name: "UserFilter",
 * //         fields: {
 * //             q: { type: GraphQLString },
 * //             id: { type: GraphQLString },
 * //             name: { type: GraphQLString },
 * //         }
 * //     }),
 * // }
 */


var _default = function _default(data) {
  return Object.keys(data).reduce(function (types, key) {
    return Object.assign({}, types, _defineProperty({}, (0, _nameConverter.getTypeFromKey)(key), new _graphql.GraphQLInputObjectType({
      name: "".concat((0, _nameConverter.getTypeFromKey)(key), "Filter"),
      fields: Object.assign({
        q: {
          type: _graphql.GraphQLString
        }
      }, {
        ids: {
          type: new _graphql.GraphQLList(_graphql.GraphQLID)
        }
      }, (0, _getFieldsFromEntities["default"])(data[key], false), getRangeFiltersFromEntities(data[key]))
    })));
  }, {});
};

exports["default"] = _default;