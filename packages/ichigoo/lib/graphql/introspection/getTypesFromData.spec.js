"use strict";

var _graphql = require("graphql");

var _getTypesFromData = _interopRequireDefault(require("./getTypesFromData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('Integration test', function () {
  var data = {
    posts: [{
      id: 1,
      title: 'Lorem Ipsum',
      views: 254,
      user_id: 123
    }, {
      id: 2,
      title: 'Sic Dolor amet',
      views: 65,
      user_id: 456
    }],
    users: [{
      id: 123,
      name: 'John Doe'
    }, {
      id: 456,
      name: 'Jane Doe'
    }]
  };
  var PostType = new _graphql.GraphQLObjectType({
    name: 'Post',
    fields: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      title: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      views: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
      },
      user_id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      }
    }
  });
  var UsersType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      }
    }
  });
  var types = (0, _getTypesFromData["default"])(data);
  expect(types.map(function (t) {
    return t.toString();
  })).toEqual(['Post', 'User']);
  expect(types.map(function (t) {
    return t.getFields();
  })).toEqual([PostType.getFields(), UsersType.getFields()]);
});