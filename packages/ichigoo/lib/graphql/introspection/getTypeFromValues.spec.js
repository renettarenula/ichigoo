"use strict";

var _graphql = require("graphql");

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _DateType = _interopRequireDefault(require("./DateType"));

var _getTypeFromValues = _interopRequireDefault(require("./getTypeFromValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('returns GraphQLID for fields named id or xxx_id', function () {
  expect((0, _getTypeFromValues["default"])('id')).toEqual(_graphql.GraphQLID);
  expect((0, _getTypeFromValues["default"])('foo_id')).toEqual(_graphql.GraphQLID);
});
test('returns GraphQLList for arrays', function () {
  expect((0, _getTypeFromValues["default"])('foo', [[true, false], [true]])).toEqual(new _graphql.GraphQLList(_graphql.GraphQLBoolean));
  expect((0, _getTypeFromValues["default"])('foo', [['a', 'b'], ['c', 'd']])).toEqual(new _graphql.GraphQLList(_graphql.GraphQLString));
  expect((0, _getTypeFromValues["default"])('foo', [[123, 456], [789, 123]])).toEqual(new _graphql.GraphQLList(_graphql.GraphQLInt));
  expect((0, _getTypeFromValues["default"])('foo', [[1.23, 456], [-5, 123]])).toEqual(new _graphql.GraphQLList(_graphql.GraphQLFloat));
});
test('returns GraphQLBoolean for booleans', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [true, true, false])).toEqual(_graphql.GraphQLBoolean);
});
test('returns GraphQLString for strings', function () {
  expect((0, _getTypeFromValues["default"])('foo', ['123', '456'])).toEqual(_graphql.GraphQLString);
  expect((0, _getTypeFromValues["default"])('foo', ['abc', '123'])).toEqual(_graphql.GraphQLString);
});
test('returns GraphQLInt for integers', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [-1, 445, 34, 0])).toEqual(_graphql.GraphQLInt);
});
test('returns GraphQLFloat for floats', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [-12, 1.2, 445, 0])).toEqual(_graphql.GraphQLFloat);
});
test('returns DateType for Dates', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [new Date('2017-03-15'), new Date()])).toEqual(_DateType["default"]);
});
test('returns GraphQLJSON for objects', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [{
    foo: 1
  }, {
    bar: 2
  }, {
    id: 'a'
  }])).toEqual(_graphqlTypeJson["default"]);
});
test('returns GraphQLJSON for arrays of objects', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [[{
    foo: 1
  }, {
    bar: 2
  }], [{
    id: 'a'
  }]])).toEqual(_graphqlTypeJson["default"]);
});
test('returns GraphQLString for mixed values', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [0, '&', new Date()])).toEqual(_graphql.GraphQLString);
});
test('returns GraphQLString for no values', function () {
  return expect((0, _getTypeFromValues["default"])('foo')).toEqual(_graphql.GraphQLString);
});
test('returns GraphQLNonNull when all values are filled', function () {
  return expect((0, _getTypeFromValues["default"])('foo', [], true)).toEqual(new _graphql.GraphQLNonNull(_graphql.GraphQLString));
});