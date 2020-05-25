"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (_, _ref) {
    var id = _ref.id;
    return entityData.find(function (d) {
      return d.id == id;
    });
  };
};

exports["default"] = _default;