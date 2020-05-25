"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _inflection = require("inflection");

var _getTypesFromData = _interopRequireDefault(require("./getTypesFromData"));

var _getFilterTypesFromData = _interopRequireDefault(require("./getFilterTypesFromData"));

var _relationships = require("../relationships");

var _nameConverter = require("../nameConverter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get a GraphQL schema from data
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
 * // type Post {
 * //     id: ID
 * //     title: String
 * //     views: Int
 * //     user_id: ID
 * // }
 * //
 * // type User {
 * //     id: ID
 * //     name: String
 * // }
 * //
 * // type Query {
 * //     Post(id: ID!): Post
 * //     allPosts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: PostFilter): [Post]
 * //     User(id: ID!): User
 * //     allUsers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: UserFilter): [User]
 * // }
 * //
 * // type Mutation {
 * //     createPost(data: String): Post
 * //     updatePost(data: String): Post
 * //     removePost(id: ID!): Boolean
 * //     createUser(data: String): User
 * //     updateUser(data: String): User
 * //     removeUser(id: ID!): Boolean
 * // }
 */
var _default = function _default(data) {
  var types = (0, _getTypesFromData["default"])(data);
  var typesByName = types.reduce(function (types, type) {
    types[type.name] = type;
    return types;
  }, {});
  var filterTypesByName = (0, _getFilterTypesFromData["default"])(data);
  var listMetadataType = new _graphql.GraphQLObjectType({
    name: 'ListMetadata',
    fields: {
      count: {
        type: _graphql.GraphQLInt
      }
    }
  });
  var queryType = new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: types.reduce(function (fields, type) {
      fields[type.name] = {
        type: typesByName[type.name],
        args: {
          id: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
          }
        }
      };
      fields["all".concat((0, _inflection.camelize)((0, _inflection.pluralize)(type.name)))] = {
        type: new _graphql.GraphQLList(typesByName[type.name]),
        args: {
          page: {
            type: _graphql.GraphQLInt
          },
          perPage: {
            type: _graphql.GraphQLInt
          },
          sortField: {
            type: _graphql.GraphQLString
          },
          sortOrder: {
            type: _graphql.GraphQLString
          },
          filter: {
            type: filterTypesByName[type.name]
          }
        }
      };
      fields["_all".concat((0, _inflection.camelize)((0, _inflection.pluralize)(type.name)), "Meta")] = {
        type: listMetadataType,
        args: {
          page: {
            type: _graphql.GraphQLInt
          },
          perPage: {
            type: _graphql.GraphQLInt
          },
          filter: {
            type: filterTypesByName[type.name]
          }
        }
      };
      return fields;
    }, {})
  });
  var mutationType = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: types.reduce(function (fields, type) {
      var typeFields = typesByName[type.name].getFields();
      var nullableTypeFields = Object.keys(typeFields).reduce(function (f, fieldName) {
        f[fieldName] = Object.assign({}, typeFields[fieldName], {
          type: fieldName !== 'id' && typeFields[fieldName].type instanceof _graphql.GraphQLNonNull ? typeFields[fieldName].type.ofType : typeFields[fieldName].type
        });
        return f;
      }, {});
      fields["create".concat(type.name)] = {
        type: typesByName[type.name],
        args: typeFields
      };
      fields["update".concat(type.name)] = {
        type: typesByName[type.name],
        args: nullableTypeFields
      };
      fields["remove".concat(type.name)] = {
        type: _graphql.GraphQLBoolean,
        args: {
          id: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
          }
        }
      };
      return fields;
    }, {})
  });
  var schema = new _graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
  });
  /**
   * extend schema to add relationship fields
   * 
   * @example
   * If the `post` key contains a 'user_id' field, then
   * add one-to-many and many-to-one type extensions:
   *     extend type Post { User: User }
   *     extend type User { Posts: [Post] }
   */

  var schemaExtension = Object.values(typesByName).reduce(function (ext, type) {
    Object.keys(type.getFields()).filter(_relationships.isRelationshipField).map(function (fieldName) {
      var relType = (0, _nameConverter.getRelatedType)(fieldName);
      var rel = (0, _inflection.pluralize)(type.toString());
      ext += "\nextend type ".concat(type, " { ").concat(relType, ": ").concat(relType, " }\nextend type ").concat(relType, " { ").concat(rel, ": [").concat(type, "] }");
    });
    return ext;
  }, '');
  return schemaExtension ? (0, _graphql.extendSchema)(schema, (0, _graphql.parse)(schemaExtension)) : schema;
};

exports["default"] = _default;