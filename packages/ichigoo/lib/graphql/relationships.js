"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRelationshipField = void 0;

var isRelationshipField = function isRelationshipField(fieldName) {
  return fieldName.endsWith('_id');
};

exports.isRelationshipField = isRelationshipField;