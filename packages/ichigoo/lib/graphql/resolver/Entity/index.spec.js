"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('provides empty resolver for data without relationship', function () {
  return expect((0, _index["default"])('posts', {
    posts: []
  })).toEqual({});
});
var data = {
  posts: [{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123
  }, {
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456
  }, {
    id: 3,
    title: 'Sic Dolor amet',
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
test('provides many to one relationship reolvers', function () {
  var _entity = (0, _index["default"])('posts', data),
      User = _entity.User;

  expect(User(data.posts[0])).toEqual({
    id: 123,
    name: 'John Doe'
  });
  expect(User(data.posts[1])).toEqual({
    id: 456,
    name: 'Jane Doe'
  });

  var _entity2 = (0, _index["default"])('comments', data),
      Post = _entity2.Post;

  expect(Post(data.comments[0])).toEqual({
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123
  });
  expect(Post(data.comments[1])).toEqual({
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123
  });
  expect(Post(data.comments[2])).toEqual({
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456
  });
});
test('provides one to many relationship reolvers', function () {
  var _entity3 = (0, _index["default"])('posts', data),
      Comments = _entity3.Comments;

  expect(Comments(data.posts[0])).toEqual([{
    id: 987,
    post_id: 1,
    body: 'Consectetur adipiscing elit'
  }, {
    id: 995,
    post_id: 1,
    body: 'Nam molestie pellentesque dui'
  }]);
  expect(Comments(data.posts[1])).toEqual([{
    id: 998,
    post_id: 2,
    body: 'Sunt in culpa qui officia'
  }]);
  expect(Comments(data.posts[2])).toEqual([]);

  var _entity4 = (0, _index["default"])('users', data),
      Posts = _entity4.Posts;

  expect(Posts(data.users[0])).toEqual([{
    id: 1,
    title: 'Lorem Ipsum',
    user_id: 123
  }, {
    id: 3,
    title: 'Sic Dolor amet',
    user_id: 123
  }]);
  expect(Posts(data.users[1])).toEqual([{
    id: 2,
    title: 'Ut enim ad minim',
    user_id: 456
  }]);
});