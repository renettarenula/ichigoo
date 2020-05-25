"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getTypeFromValues = _interopRequireDefault(require("./getTypeFromValues"));

var _getValuesFromEntities = _interopRequireDefault(require("./getValuesFromEntities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Get a list of GraphQL fields from a list of entities
 * 
 * @example
 * const entities = [
 *     {
 *         "id": 1,
 *         "title": "Lorem Ipsum",
 *         "views": 254,
 *         "user_id": 123,
 *     },
 *     {
 *         "id": 2,
 *         "title": "Sic Dolor amet",
 *         "user_id": 456,
 *     },
 * ];
 * const types = getFieldsFromEntities(entities);
 * // {
 * //    id: { type: new GraphQLNonNull(GraphQLString) },
 * //    title: { type: new GraphQLNonNull(GraphQLString) },
 * //    views: { type: GraphQLInt },
 * //    user_id: { type: new GraphQLNonNull(GraphQLString) },
 * // };
 */
var _default = function _default(entities) {
  var checkRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fieldValues = (0, _getValuesFromEntities["default"])(entities);
  var nbValues = entities.length;
  return Object.keys(fieldValues).reduce(function (fields, fieldName) {
    fields[fieldName] = {
      type: (0, _getTypeFromValues["default"])(fieldName, fieldValues[fieldName], checkRequired ? fieldValues[fieldName].length === nbValues : false)
    };
    return fields;
  }, {});
};

exports["default"] = _default;