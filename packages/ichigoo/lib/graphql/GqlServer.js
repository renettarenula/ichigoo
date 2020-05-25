"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _Schema = _interopRequireDefault(require("./Schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(data) {
  return (0, _expressGraphql["default"])({
    schema: (0, _Schema["default"])(data),
    graphiql: true
  });
};

exports["default"] = _default;