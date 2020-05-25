"use strict";

var _remove = _interopRequireDefault(require("./remove"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('returns undefined by default', function () {
  expect((0, _remove["default"])()(null, {})).toBeUndefined();
});
test('returns removed record when found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }, {
    id: 2,
    value: 'bar'
  }];
  expect((0, _remove["default"])(data)(null, {
    id: 1
  })).toEqual({
    id: 1,
    value: 'foo'
  });
  expect(data).toEqual([{
    id: 2,
    value: 'bar'
  }]);
});
test('returns undefined when not found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }, {
    id: 2,
    value: 'bar'
  }];
  expect((0, _remove["default"])(data)(null, {
    id: 3
  })).toBeUndefined();
});
test('leaves data unmodified when not found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }, {
    id: 2,
    value: 'bar'
  }];
  var originalData = [].concat(data);
  expect((0, _remove["default"])(data)(null, {
    id: 3
  })).toBeUndefined();
  expect(data).toEqual(originalData);
});
test('removes record when found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }, {
    id: 2,
    value: 'bar'
  }];
  (0, _remove["default"])(data)(null, {
    id: 1
  });
  expect(data).toEqual([{
    id: 2,
    value: 'bar'
  }]);
});
test('removes with string data id', function () {
  var data = [{
    id: '1',
    value: 'foo'
  }, {
    id: '2',
    value: 'bar'
  }];
  (0, _remove["default"])(data)(null, {
    id: 1
  });
  expect(data).toEqual([{
    id: '2',
    value: 'bar'
  }]);
});
test('removes with string input and data ids', function () {
  var data = [{
    id: 'abc',
    value: 'foo'
  }, {
    id: 'def',
    value: 'bar'
  }];
  (0, _remove["default"])(data)(null, {
    id: 'abc'
  });
  expect(data).toEqual([{
    id: 'def',
    value: 'bar'
  }]);
});
test("doesn't confuse undefined id with the id 'undefined'", function () {
  var data = [{
    value: 'foo'
  }, {
    id: 'def',
    value: 'bar'
  }];
  expect((0, _remove["default"])(data)(null, {
    id: 'undefined'
  })).toBeUndefined();
  expect(data).toEqual([{
    value: 'foo'
  }, {
    id: 'def',
    value: 'bar'
  }]);
});