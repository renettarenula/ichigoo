"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloClient = require("apollo-client");

var _apolloTestUtils = require("apollo-test-utils");

var _getSchemaFromData = _interopRequireDefault(require("./introspection/getSchemaFromData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(data) {
  var schema = (0, _getSchemaFromData["default"])(data);
  var mockNetworkInterface = (0, _apolloTestUtils.mockNetworkInterfaceWithSchema)({
    schema: schema
  });
  var client = new _apolloClient.ApolloClient({
    networkInterface: mockNetworkInterface
  });
  return client;
};

exports["default"] = _default;