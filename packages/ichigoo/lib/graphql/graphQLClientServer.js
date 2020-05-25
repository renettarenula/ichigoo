"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _xhrMock = _interopRequireWildcard(require("xhr-mock"));

var _handleRequest = _interopRequireDefault(require("./handleRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Starts a GraphQL Server in your browser: intercepts every call to http://localhost:3000/graphql 
 * and returns a response from the supplied data.
 * 
 * @export A sinon.js FakeServer (http://sinonjs.org/releases/v2.3.6/fake-xhr-and-server/#fake-server)
 * @param {any} data 
 * @param {any} url Specifies the endpoint to intercept (Default is 'http://localhost:3000/graphql').
 * 
 * @example
 * const data = {
 *    "posts": [
 *        {
 *            "id": 1,
 *            "title": "Lorem Ipsum",
 *            "views": 254,
 *            "user_id": 123,
 *        },
 *        {
 *            "id": 2,
 *            "title": "Sic Dolor amet",
 *            "views": 65,
 *            "user_id": 456,
 *        },
 *    ],
 *    "users": [
 *        {
 *            "id": 123,
 *            "name": "John Doe"
 *        },
 *        {
 *            "id": 456,
 *            "name": "Jane Doe"
 *        }
 *    ],
 * };
 * 
 * GraphQLClientServer(data);
 * GraphQLClientServer(data, 'http://localhost:8080/api/graphql');
 */
function _default(_ref) {
  var data = _ref.data,
      url = _ref.url;
  var handleRequest = (0, _handleRequest["default"])(data);
  return {
    start: function start() {
      // Intercept all XmlHttpRequest
      _xhrMock["default"].setup(); // Only handle POST request to the specified url


      _xhrMock["default"].post(url, function (req, res) {
        return new Promise(function (resolve) {
          handleRequest(url, {
            body: req.body()
          }).then(function (response) {
            res.status(response.status);
            res.headers(response.headers);
            res.body(response.body);
            resolve(res);
          });
        });
      }); // Ensure all other requests are handled by the default XmlHttpRequest


      _xhrMock["default"].use(_xhrMock.proxy);
    },
    stop: function stop() {
      _xhrMock["default"].teardown();
    },
    getHandler: function getHandler() {
      return handleRequest;
    }
  };
}