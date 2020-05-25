"use strict";

var _update = _interopRequireDefault(require("./update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('returns undefined by default', function () {
  expect((0, _update["default"])()(null, {})).toBeUndefined();
});
test('returns updated record when found', function () {
  var data = [{
    id: 1,
    value: 'foo',
    bar: 'baz'
  }];
  expect((0, _update["default"])(data)(null, {
    id: 1,
    value: 'bar'
  })).toEqual({
    id: 1,
    value: 'bar',
    bar: 'baz'
  });
});
test('returns undefined when not found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }, {
    id: 2,
    value: 'bar'
  }];
  expect((0, _update["default"])(data)(null, {
    id: 3
  })).toBeUndefined();
});
test('updates record when found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }];
  (0, _update["default"])(data)(null, {
    id: 1,
    value: 'bar',
    bar: 'baz'
  });
  expect(data).toEqual([{
    id: 1,
    value: 'bar',
    bar: 'baz'
  }]);
});
test('updates record with string id', function () {
  var data = [{
    id: 'abc',
    value: 'foo'
  }];
  (0, _update["default"])(data)(null, {
    id: 'abc',
    value: 'bar',
    bar: 'baz'
  });
  expect(data).toEqual([{
    id: 'abc',
    value: 'bar',
    bar: 'baz'
  }]);
});
test('removes property when setting the value to undefined', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }];
  (0, _update["default"])(data)(null, {
    id: 1,
    value: undefined
  });
  expect(data).toEqual([{
    id: 1
  }]);
});
test("doesn't confuse undefined id with the id 'undefined'", function () {
  var data = [{
    value: 'foo'
  }];
  expect((0, _update["default"])(data)(null, {
    id: 'undefined',
    value: 'bar',
    bar: 'baz'
  })).toBeUndefined();
  expect(data).toEqual([{
    value: 'foo'
  }]);
});