"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphQLClientServer = _interopRequireDefault(require("./graphQLClientServer"));

var _schemaBuilder = _interopRequireDefault(require("./schemaBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (typeof window !== 'undefined') {
  window.JsonGraphqlServer = _graphQLClientServer["default"];
  window.jsonSchemaBuilder = _schemaBuilder["default"];
}

var _default = _graphQLClientServer["default"];
exports["default"] = _default;