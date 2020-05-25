"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getFieldsFromEntities = _interopRequireDefault(require("../../introspection/getFieldsFromEntities"));

var _nameConverter = require("../../nameConverter");

var _relationships = require("../../relationships");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Add resolvers for relationship fields
 * 
 * @example
 * Consider this data:
 * 
 *     {
 *         posts: [
 *              { id: 1, title: 'Hello, world', user_id: 123 }
 *         ],
 *         users: [
 *              { id: 123, name: 'John Doe' }
 *         ]
 *         comments: [
 *              { id: 4646, post_id: 1, body: 'Nice post!' }
 *         ]
 *     }
 * 
 * There are two relationship fields here, posts.user_id and comments.post_id.
 * The generated GraphQL schema for posts is:
 * 
 *     type Post {
 *         id: ID!
 *         title: String
 *         user_id: ID
 *         User: User
 *         Comments: [Comment]
 *     }
 * 
 * When called for the posts entity, this method generates resolvers 
 * for Post.User and Post.Comments
 * 
 * @param {String} entityName The entity key in the data map, e.g. "posts"
 * @param {Object} data The entire data map, e.g. { posts: [], users: [] }
 * 
 * @return {Object} resolvers, e.g. 
 * 
 *     {
 *         Post: {
 *             User: (post) => users.find(user => user.id == post.user_id),
 *             Comments: (post) => comments.filter(comment => comment.post_id = post.id),
 *         },
 *     }
 */
var _default = function _default(entityName, data) {
  var entityFields = Object.keys((0, _getFieldsFromEntities["default"])(data[entityName]));
  var manyToOneResolvers = entityFields.filter(_relationships.isRelationshipField).reduce(function (resolvers, fieldName) {
    return Object.assign({}, resolvers, _defineProperty({}, (0, _nameConverter.getRelatedType)(fieldName), function (entity) {
      return data[(0, _nameConverter.getRelatedKey)(fieldName)].find(function (relatedRecord) {
        return relatedRecord.id == entity[fieldName];
      });
    }));
  }, {});
  var relatedField = (0, _nameConverter.getReverseRelatedField)(entityName); // 'posts' => 'post_id'

  var hasReverseRelationship = function hasReverseRelationship(entityName) {
    return (0, _getFieldsFromEntities["default"])(data[entityName]).hasOwnProperty(relatedField);
  };

  var entities = Object.keys(data);
  var oneToManyResolvers = entities.filter(hasReverseRelationship).reduce(function (resolvers, entityName) {
    return Object.assign({}, resolvers, _defineProperty({}, (0, _nameConverter.getRelationshipFromKey)(entityName), function (entity) {
      return data[entityName].filter(function (record) {
        return record[relatedField] == entity.id;
      });
    }));
  }, {});
  return Object.assign({}, manyToOneResolvers, oneToManyResolvers);
};

exports["default"] = _default;