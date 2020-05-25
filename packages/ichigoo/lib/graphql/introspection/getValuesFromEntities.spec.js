"use strict";

var _getValuesFromEntities = _interopRequireDefault(require("./getValuesFromEntities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('does not take empty values into account', function () {
  expect((0, _getValuesFromEntities["default"])([{
    foo: null
  }, {}, {
    foo: 'bar'
  }])).toEqual({
    foo: ['bar']
  });
});
test('returns an array of values for every field', function () {
  expect((0, _getValuesFromEntities["default"])([{
    id: 1,
    foo: 'bar'
  }, {
    id: 2,
    foo: 'baz'
  }])).toEqual({
    id: [1, 2],
    foo: ['bar', 'baz']
  });
});
test('does not ignore duplicate values', function () {
  expect((0, _getValuesFromEntities["default"])([{
    foo: 'bar'
  }, {
    foo: 'bar'
  }])).toEqual({
    foo: ['bar', 'bar']
  });
});
test('can handle sparse fieldsets', function () {
  expect((0, _getValuesFromEntities["default"])([{
    id: 1,
    foo: 'foo1'
  }, {
    id: 2,
    foo: 'foo2',
    bar: 'bar1'
  }, {
    id: 3,
    bar: 'bar2'
  }])).toEqual({
    id: [1, 2, 3],
    foo: ['foo1', 'foo2'],
    bar: ['bar1', 'bar2']
  });
});