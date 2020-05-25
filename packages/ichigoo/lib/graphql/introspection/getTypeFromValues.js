"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphql = require("graphql");

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _DateType = _interopRequireDefault(require("./DateType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isNumeric = function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

var valuesAreNumeric = function valuesAreNumeric(values) {
  return values.every(isNumeric);
};

var isInteger = function isInteger(value) {
  return Number.isInteger(value);
};

var valuesAreInteger = function valuesAreInteger(values) {
  return values.every(isInteger);
};

var isBoolean = function isBoolean(value) {
  return typeof value === 'boolean';
};

var valuesAreBoolean = function valuesAreBoolean(values) {
  return values.every(isBoolean);
};

var isString = function isString(value) {
  return typeof value === 'string';
};

var valuesAreString = function valuesAreString(values) {
  return values.every(isString);
};

var isArray = function isArray(value) {
  return Array.isArray(value);
};

var valuesAreArray = function valuesAreArray(values) {
  return values.every(isArray);
};

var isDate = function isDate(value) {
  return value instanceof Date;
};

var valuesAreDate = function valuesAreDate(values) {
  return values.every(isDate);
};

var isObject = function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

var valuesAreObject = function valuesAreObject(values) {
  return values.every(isObject);
};

var requiredTypeOrNormal = function requiredTypeOrNormal(type, isRequired) {
  return isRequired ? new _graphql.GraphQLNonNull(type) : type;
};

var _default = function _default(name) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var isRequired = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (name === 'id' || name.substr(name.length - 3) === '_id') {
    return requiredTypeOrNormal(_graphql.GraphQLID, isRequired);
  }

  if (values.length > 0) {
    if (valuesAreArray(values)) {
      var leafValues = values.reduce(function (agg, arr) {
        arr.forEach(function (value) {
          return agg.push(value);
        });
        return agg;
      }, []);

      if (valuesAreBoolean(leafValues)) {
        return requiredTypeOrNormal(new _graphql.GraphQLList(_graphql.GraphQLBoolean), isRequired);
      }

      if (valuesAreString(leafValues)) {
        return requiredTypeOrNormal(new _graphql.GraphQLList(_graphql.GraphQLString), isRequired);
      }

      if (valuesAreInteger(leafValues)) {
        return requiredTypeOrNormal(new _graphql.GraphQLList(_graphql.GraphQLInt), isRequired);
      }

      if (valuesAreNumeric(leafValues)) {
        return requiredTypeOrNormal(new _graphql.GraphQLList(_graphql.GraphQLFloat), isRequired);
      }

      if (valuesAreObject(leafValues)) {
        return requiredTypeOrNormal(_graphqlTypeJson["default"], isRequired);
      }

      return requiredTypeOrNormal(new _graphql.GraphQLList(_graphql.GraphQLString), isRequired); // FIXME introspect further
    }

    if (valuesAreBoolean(values)) {
      return requiredTypeOrNormal(_graphql.GraphQLBoolean, isRequired);
    }

    if (valuesAreDate(values)) {
      return requiredTypeOrNormal(_DateType["default"], isRequired);
    }

    if (valuesAreString(values)) {
      return requiredTypeOrNormal(_graphql.GraphQLString, isRequired);
    }

    if (valuesAreInteger(values)) {
      return requiredTypeOrNormal(_graphql.GraphQLInt, isRequired);
    }

    if (valuesAreNumeric(values)) {
      return requiredTypeOrNormal(_graphql.GraphQLFloat, isRequired);
    }

    if (valuesAreObject(values)) {
      return requiredTypeOrNormal(_graphqlTypeJson["default"], isRequired);
    }
  }

  return requiredTypeOrNormal(_graphql.GraphQLString, isRequired); // FIXME introspect further
};

exports["default"] = _default;