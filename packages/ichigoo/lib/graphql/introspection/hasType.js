"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getFilterTypesFromData = _interopRequireDefault(require("./getFilterTypesFromData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(name, data) {
  return Object.values((0, _getFilterTypesFromData["default"])(data)).reduce(function (hasJSON, type) {
    if (hasJSON) return true;
    return Object.values(type.getFields()).reduce(function (hasJSONField, field) {
      if (hasJSONField) return true;
      return field.type.name == name;
    }, false);
  }, false);
};

exports["default"] = _default;