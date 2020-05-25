"use strict";

var _express = _interopRequireDefault(require("express"));

var _supertest = _interopRequireDefault(require("supertest"));

var _jsonGraphqlExpress = _interopRequireDefault(require("./jsonGraphqlExpress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = {
  posts: [{
    id: 1,
    title: 'Lorem Ipsum',
    views: 254,
    user_id: 123
  }, {
    id: 2,
    title: 'Ut enim ad minim veniam',
    views: 65,
    user_id: 456
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    views: 76,
    user_id: 123
  }],
  users: [{
    id: 123,
    name: 'John Doe'
  }, {
    id: 456,
    name: 'Jane Doe'
  }],
  comments: [{
    id: 987,
    post_id: 1,
    body: 'Consectetur adipiscing elit'
  }, {
    id: 995,
    post_id: 1,
    body: 'Nam molestie pellentesque dui'
  }, {
    id: 998,
    post_id: 2,
    body: 'Sunt in culpa qui officia'
  }]
};
var agent;
beforeAll(function () {
  var app = (0, _express["default"])();
  app.use('/', (0, _jsonGraphqlExpress["default"])(data));
  agent = (0, _supertest["default"])(app);
});

var gqlAgent = function gqlAgent(query, variables) {
  return agent.post('/').send({
    query: query,
    variables: variables
  });
};

describe('integration tests', function () {
  it('returns all entities by default', function () {
    return gqlAgent('{ allPosts { id } }').expect({
      data: {
        allPosts: [{
          id: '1'
        }, {
          id: '2'
        }, {
          id: '3'
        }]
      }
    });
  });
  it('filters by string using the q filter in a case-insensitive way', function () {
    return gqlAgent('{ allPosts(filter: { q: "lorem" }) { id } }').expect({
      data: {
        allPosts: [{
          id: '1'
        }]
      }
    });
  });
  it('gets an entity by id', function () {
    return gqlAgent('{ Post(id: 1) { id } }').expect({
      data: {
        Post: {
          id: '1'
        }
      }
    });
  });
  it('gets all the entity fields', function () {
    return gqlAgent('{ Post(id: 1) { id title views user_id } }').expect({
      data: {
        Post: {
          id: '1',
          title: 'Lorem Ipsum',
          views: 254,
          user_id: '123'
        }
      }
    });
  });
  it('throws an error when asked for a non existent field', function () {
    return gqlAgent('{ Post(id: 1) { foo } }').expect({
      errors: [{
        message: 'Cannot query field "foo" on type "Post".',
        locations: [{
          line: 1,
          column: 17
        }]
      }]
    });
  });
  it('gets relationship fields', function () {
    return gqlAgent('{ Post(id: 1) { User { name } Comments { body }} }').expect({
      data: {
        Post: {
          User: {
            name: 'John Doe'
          },
          Comments: [{
            body: 'Consectetur adipiscing elit'
          }, {
            body: 'Nam molestie pellentesque dui'
          }]
        }
      }
    });
  });
  it('allows multiple mutations', function () {
    return gqlAgent('mutation{ updatePost(id:"2", title:"Foo bar", views: 200, user_id:"123") { id } }').then(function () {
      return gqlAgent('mutation{ updatePost(id:"2", title:"Foo bar", views: 200, user_id:"123") { id } }');
    }).then(function (res) {
      return expect(res.body).toEqual({
        data: {
          updatePost: {
            id: '2'
          }
        }
      });
    });
  });
});