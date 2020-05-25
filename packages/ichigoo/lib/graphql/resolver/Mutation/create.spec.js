"use strict";

var _create = _interopRequireDefault(require("./create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('returns a new object with id 0 on empty datastore', function () {
  expect((0, _create["default"])()(null, {})).toEqual({
    id: 0
  });
});
test('returns a new object with incremental id', function () {
  var data = [{
    id: 1
  }, {
    id: 3
  }];
  expect((0, _create["default"])(data)(null, {})).toEqual({
    id: 4
  });
});
test('returns a new object using create data', function () {
  var data = [{
    id: 0,
    value: 'foo'
  }];
  expect((0, _create["default"])(data)(null, {
    value: 'toto'
  })).toEqual({
    id: 1,
    value: 'toto'
  });
});
test('creates a new record', function () {
  var data = [{
    id: 1
  }, {
    id: 3
  }];
  (0, _create["default"])(data)(null, {
    value: 'foo'
  });
  expect(data).toEqual([{
    id: 1
  }, {
    id: 3
  }, {
    id: 4,
    value: 'foo'
  }]);
});