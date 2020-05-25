"use strict";

var _applyFilters = _interopRequireDefault(require("./applyFilters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [{
  id: 1,
  title: 'Lorem Ipsum',
  user_id: 123,
  views: 254,
  tags: ['foo', 'bar']
}, {
  id: 2,
  title: 'Ut enim ad minim',
  user_id: 456,
  views: 65,
  tags: ['foo']
}, {
  id: 3,
  title: 'Sic Dolor amet',
  user_id: 123,
  views: 76,
  tags: []
}];
test('returns empty array on empty datastore', function () {
  return expect((0, _applyFilters["default"])(undefined, {})).toEqual([]);
});
test('returns all entities by default', function () {
  return expect((0, _applyFilters["default"])(data, {})).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar']
  }, {
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: []
  }]);
});
test('filters by string on all text fields using the q filter', function () {
  return expect((0, _applyFilters["default"])(data, {
    q: 'Lorem'
  })).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar']
  }]);
});
test('filters by string using the q filter in a case-insensitive way', function () {
  return expect((0, _applyFilters["default"])(data, {
    q: 'lorem'
  })).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar']
  }]);
});
test('filters by value on each field using the related filter', function () {
  expect((0, _applyFilters["default"])(data, {
    id: 2
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }]);
  expect((0, _applyFilters["default"])(data, {
    title: 'Sic Dolor amet'
  })).toEqual([{
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: []
  }]);
  expect((0, _applyFilters["default"])(data, {
    views: 65
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }]);
  expect((0, _applyFilters["default"])(data, {
    user_id: 456
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }]);
});
test('filters by value range on each integer field using the related filters', function () {
  expect((0, _applyFilters["default"])(data, {
    views_lt: 76
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }]);
  expect((0, _applyFilters["default"])(data, {
    views_lte: 76
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: []
  }]);
  expect((0, _applyFilters["default"])(data, {
    views_gt: 76
  })).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar']
  }]);
  expect((0, _applyFilters["default"])(data, {
    views_gte: 76
  })).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar']
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: []
  }]);
});
test('should filter by id if filter contains an ids key', function () {
  expect((0, _applyFilters["default"])(data, {
    ids: [2, 3]
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: []
  }]);
});
test('should filter by value if filter contains an array for the key', function () {
  expect((0, _applyFilters["default"])(data, {
    title: ['Ut enim ad minim', 'Sic Dolor amet']
  })).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123,
    views: 76,
    tags: []
  }]);
  expect((0, _applyFilters["default"])(data, {
    tags: ['foo']
  })).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123,
    views: 254,
    tags: ['foo', 'bar']
  }, {
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456,
    views: 65,
    tags: ['foo']
  }]);
});