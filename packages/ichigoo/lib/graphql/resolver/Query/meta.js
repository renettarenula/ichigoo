"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _applyFilters = _interopRequireDefault(require("./applyFilters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(entityData) {
  return function (_, _ref) {
    var _ref$filter = _ref.filter,
        filter = _ref$filter === void 0 ? {} : _ref$filter;
    var items = (0, _applyFilters["default"])(entityData, filter);
    return {
      count: items.length
    };
  };
};

exports["default"] = _default;