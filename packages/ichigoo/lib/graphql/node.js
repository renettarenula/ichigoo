"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.jsonSchemaBuilder = void 0;

var _jsonGraphqlExpress = _interopRequireDefault(require("./jsonGraphqlExpress"));

var _schemaBuilder = _interopRequireDefault(require("./schemaBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jsonSchemaBuilder = _schemaBuilder["default"];
exports.jsonSchemaBuilder = jsonSchemaBuilder;
var _default = _jsonGraphqlExpress["default"];
exports["default"] = _default;