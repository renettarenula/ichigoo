"use strict";

var _graphql = require("graphql");

var _getFieldsFromEntities = _interopRequireDefault(require("./getFieldsFromEntities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('does infer field types', function () {
  expect((0, _getFieldsFromEntities["default"])([{
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
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
    },
    foo: {
      type: _graphql.GraphQLString
    },
    bar: {
      type: _graphql.GraphQLString
    }
  });
});