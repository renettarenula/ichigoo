"use strict";

var _express = _interopRequireDefault(require("express"));

var _GqlServer = _interopRequireDefault(require("./GqlServer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = {
  posts: [{
    id: 1,
    title: "My favorite cat",
    views: 1000,
    user_id: 123
  }, {
    id: 2,
    title: "My favorite kitty",
    views: 1000,
    user_id: 456
  }],
  users: [{
    id: 123,
    name: "John Doe"
  }, {
    id: 456,
    name: "Jane Doe"
  }]
};
var app = (0, _express["default"])();
app.use("/graphql", (0, _GqlServer["default"])(data));
app.listen(4000);