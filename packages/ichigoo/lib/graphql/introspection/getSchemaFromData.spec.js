"use strict";

var _graphql = require("graphql");

var _getSchemaFromData = _interopRequireDefault(require("./getSchemaFromData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  fields: function fields() {
    return {
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
      },
      User: {
        type: UserType
      }
    };
  }
});
var UserType = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
      },
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
      },
      Posts: {
        type: new _graphql.GraphQLList(PostType)
      }
    };
  }
});
/*
const ListMetadataType = new GraphQLObjectType({
    name: 'ListMetadata',
    fields: {
        count: { type: GraphQLInt },
    },
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getPost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
        },
        getPageOfPost: {
            type: new GraphQLList(PostType),
            args: {
                page: { type: GraphQLInt },
                perPage: { type: GraphQLInt },
                sortField: { type: GraphQLString },
                sortOrder: { type: GraphQLString },
                filter: { type: GraphQLString },
            },
        },
        getUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
        },
        getPageOfUser: {
            type: new GraphQLList(UserType),
            args: {
                page: { type: GraphQLInt },
                perPage: { type: GraphQLInt },
                sortField: { type: GraphQLString },
                sortOrder: { type: GraphQLString },
                filter: { type: GraphQLString },
            },
        },
    },
});
*/

test('creates one type per data type', function () {
  var typeMap = (0, _getSchemaFromData["default"])(data).getTypeMap();
  expect(typeMap['Post'].name).toEqual(PostType.name);
  expect(Object.keys(typeMap['Post'].getFields())).toEqual(Object.keys(PostType.getFields()));
  expect(typeMap['User'].name).toEqual(UserType.name);
  expect(Object.keys(typeMap['User'].getFields())).toEqual(Object.keys(UserType.getFields()));
});
test('creates one field per relationship', function () {
  var typeMap = (0, _getSchemaFromData["default"])(data).getTypeMap();
  expect(Object.keys(typeMap['Post'].getFields())).toContain('User');
});
test('creates one field per reverse relationship', function () {
  var typeMap = (0, _getSchemaFromData["default"])(data).getTypeMap();
  expect(Object.keys(typeMap['User'].getFields())).toContain('Posts');
});
test('creates three query fields per data type', function () {
  var queries = (0, _getSchemaFromData["default"])(data).getQueryType().getFields();
  expect(queries['Post'].type.name).toEqual(PostType.name);
  expect(queries['Post'].args).toEqual([{
    defaultValue: undefined,
    description: null,
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
  }]);
  expect(queries['allPosts'].type.toString()).toEqual('[Post]');
  expect(queries['allPosts'].args[0].name).toEqual('page');
  expect(queries['allPosts'].args[0].type).toEqual(_graphql.GraphQLInt);
  expect(queries['allPosts'].args[1].name).toEqual('perPage');
  expect(queries['allPosts'].args[1].type).toEqual(_graphql.GraphQLInt);
  expect(queries['allPosts'].args[2].name).toEqual('sortField');
  expect(queries['allPosts'].args[2].type).toEqual(_graphql.GraphQLString);
  expect(queries['allPosts'].args[3].name).toEqual('sortOrder');
  expect(queries['allPosts'].args[3].type).toEqual(_graphql.GraphQLString);
  expect(queries['allPosts'].args[4].name).toEqual('filter');
  expect(queries['allPosts'].args[4].type.toString()).toEqual('PostFilter');
  expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');
  expect(queries['User'].type.name).toEqual(UserType.name);
  expect(queries['User'].args).toEqual([{
    defaultValue: undefined,
    description: null,
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
  }]);
  expect(queries['allUsers'].type.toString()).toEqual('[User]');
  expect(queries['allUsers'].args[0].name).toEqual('page');
  expect(queries['allUsers'].args[0].type).toEqual(_graphql.GraphQLInt);
  expect(queries['allUsers'].args[1].name).toEqual('perPage');
  expect(queries['allUsers'].args[1].type).toEqual(_graphql.GraphQLInt);
  expect(queries['allUsers'].args[2].name).toEqual('sortField');
  expect(queries['allUsers'].args[2].type).toEqual(_graphql.GraphQLString);
  expect(queries['allUsers'].args[3].name).toEqual('sortOrder');
  expect(queries['allUsers'].args[3].type).toEqual(_graphql.GraphQLString);
  expect(queries['allUsers'].args[4].name).toEqual('filter');
  expect(queries['allUsers'].args[4].type.toString()).toEqual('UserFilter');
  expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');
});
test('creates three mutation fields per data type', function () {
  var mutations = (0, _getSchemaFromData["default"])(data).getMutationType().getFields();
  expect(mutations['createPost'].type.name).toEqual(PostType.name);
  expect(mutations['createPost'].args).toEqual([{
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    defaultValue: undefined,
    description: null
  }, {
    name: 'title',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
    defaultValue: undefined,
    description: null
  }, {
    name: 'views',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
    defaultValue: undefined,
    description: null
  }, {
    name: 'user_id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    defaultValue: undefined,
    description: null
  }]);
  expect(mutations['updatePost'].type.name).toEqual(PostType.name);
  expect(mutations['updatePost'].args).toEqual([{
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    defaultValue: undefined,
    description: null
  }, {
    name: 'title',
    type: _graphql.GraphQLString,
    defaultValue: undefined,
    description: null
  }, {
    name: 'views',
    type: _graphql.GraphQLInt,
    defaultValue: undefined,
    description: null
  }, {
    name: 'user_id',
    type: _graphql.GraphQLID,
    defaultValue: undefined,
    description: null
  }]);
  expect(mutations['removePost'].type.name).toEqual(_graphql.GraphQLBoolean.name);
  expect(mutations['removePost'].args).toEqual([{
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    defaultValue: undefined,
    description: null
  }]);
  expect(mutations['createUser'].type.name).toEqual(UserType.name);
  expect(mutations['createUser'].args).toEqual([{
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    defaultValue: undefined,
    description: null
  }, {
    name: 'name',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
    defaultValue: undefined,
    description: null
  }]);
  expect(mutations['updateUser'].type.name).toEqual(UserType.name);
  expect(mutations['updateUser'].args).toEqual([{
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID),
    defaultValue: undefined,
    description: null
  }, {
    name: 'name',
    type: _graphql.GraphQLString,
    defaultValue: undefined,
    description: null
  }]);
  expect(mutations['removeUser'].type.name).toEqual(_graphql.GraphQLBoolean.name);
  expect(mutations['removeUser'].args).toEqual([{
    defaultValue: undefined,
    description: null,
    name: 'id',
    type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
  }]);
});
test('pluralizes and capitalizes correctly', function () {
  var data = {
    feet: [{
      id: 1,
      size: 42
    }, {
      id: 2,
      size: 39
    }],
    categories: [{
      id: 1,
      name: 'foo'
    }]
  };
  var queries = (0, _getSchemaFromData["default"])(data).getQueryType().getFields();
  expect(queries).toHaveProperty('Foot');
  expect(queries).toHaveProperty('Category');
  expect(queries).toHaveProperty('allFeet');
  expect(queries).toHaveProperty('allCategories');
  var types = (0, _getSchemaFromData["default"])(data).getTypeMap();
  expect(types).toHaveProperty('Foot');
  expect(types).toHaveProperty('Category');
});