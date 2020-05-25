"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (_, entity) {
    var newId = entityData.length > 0 ? entityData[entityData.length - 1].id + 1 : 0;
    var newEntity = Object.assign({
      id: newId
    }, entity);
    entityData.push(newEntity);
    return newEntity;
  };
};

exports["default"] = _default;