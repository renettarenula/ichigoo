"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (_, params) {
    var updatedEntity = undefined;

    if (params.id != null) {
      var stringId = params.id.toString();
      var indexOfEntity = entityData.findIndex(function (e) {
        return e.id != null && e.id.toString() === stringId;
      });

      if (indexOfEntity !== -1) {
        entityData[indexOfEntity] = Object.assign({}, entityData[indexOfEntity], params);
        updatedEntity = entityData[indexOfEntity];
      }
    }

    return updatedEntity;
  };
};

exports["default"] = _default;