"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inflection = require("inflection");

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _all = _interopRequireDefault(require("./Query/all"));

var _meta = _interopRequireDefault(require("./Query/meta"));

var _single = _interopRequireDefault(require("./Query/single"));

var _create = _interopRequireDefault(require("./Mutation/create"));

var _update = _interopRequireDefault(require("./Mutation/update"));

var _remove = _interopRequireDefault(require("./Mutation/remove"));

var _Entity = _interopRequireDefault(require("./Entity"));

var _nameConverter = require("../nameConverter");

var _DateType = _interopRequireDefault(require("../introspection/DateType"));

var _hasType = _interopRequireDefault(require("../introspection/hasType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getQueryResolvers = function getQueryResolvers(entityName, data) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, "all".concat((0, _inflection.pluralize)(entityName)), (0, _all["default"])(data)), _defineProperty(_ref, "_all".concat((0, _inflection.pluralize)(entityName), "Meta"), (0, _meta["default"])(data)), _defineProperty(_ref, entityName, (0, _single["default"])(data)), _ref;
};

var getMutationResolvers = function getMutationResolvers(entityName, data) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, "create".concat(entityName), (0, _create["default"])(data)), _defineProperty(_ref2, "update".concat(entityName), (0, _update["default"])(data)), _defineProperty(_ref2, "remove".concat(entityName), (0, _remove["default"])(data)), _ref2;
};

var _default = function _default(data) {
  return Object.assign({}, {
    Query: Object.keys(data).reduce(function (resolvers, key) {
      return Object.assign({}, resolvers, getQueryResolvers((0, _nameConverter.getTypeFromKey)(key), data[key]));
    }, {}),
    Mutation: Object.keys(data).reduce(function (resolvers, key) {
      return Object.assign({}, resolvers, getMutationResolvers((0, _nameConverter.getTypeFromKey)(key), data[key]));
    }, {})
  }, Object.keys(data).reduce(function (resolvers, key) {
    return Object.assign({}, resolvers, _defineProperty({}, (0, _nameConverter.getTypeFromKey)(key), (0, _Entity["default"])(key, data)));
  }, {}), (0, _hasType["default"])('Date', data) ? {
    Date: _DateType["default"]
  } : {}, // required because makeExecutableSchema strips resolvers from typeDefs
  (0, _hasType["default"])('JSON', data) ? {
    JSON: _graphqlTypeJson["default"]
  } : {} // required because makeExecutableSchema strips resolvers from typeDefs
  );
};

exports["default"] = _default;