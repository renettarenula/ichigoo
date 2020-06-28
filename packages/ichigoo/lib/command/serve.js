const server = require("../server.js");

const serve = () => {
  server.server();
};

const gql = () => {
  server.graphQLServer();
};

module.exports = { serve, gql };
