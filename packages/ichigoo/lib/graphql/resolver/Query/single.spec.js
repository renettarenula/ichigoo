"use strict";

var _single = _interopRequireDefault(require("./single"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('returns undefined by default', function () {
  expect((0, _single["default"])()(null, {})).toBeUndefined();
});
test('returns record when found', function () {
  var data = [{
    id: 1,
    value: 'foo'
  }, {
    id: 2,
    value: 'bar'
  }];
  expect((0, _single["default"])(data)(null, {
    id: 1
  })).toEqual({
    id: 1,
    value: 'foo'
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
  expect((0, _single["default"])(data)(null, {
    id: 3
  })).toBeUndefined();
});