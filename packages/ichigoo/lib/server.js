var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
var utils = require("./ops/utils.js");
var chalk = require("chalk");
var apollo = require("apollo-server");
var schema = require("./graphql/Schema.js");

const server = () => {
  var app = express();
  app.use(
    serveStatic(path.join(utils.dir(), "dist"), { extensions: ["html"] })
  );

  var port = process.env.PORT || 5000;
  app.listen(port);

  console.log(chalk.cyan.bold("Start server at port 5000"));
};

const graphQLServer = () => {
  const ApolloServer = apollo.ApolloServer;

  const data = {
    posts: [
      {
        id: 1,
        title: "My favorite cat",
        views: 1000,
        user_id: 123,
      },
      {
        id: 2,
        title: "My favorite kitty",
        views: 1000,
        user_id: 456,
      },
    ],
    users: [
      {
        id: 123,
        name: "John Doe",
      },
      {
        id: 456,
        name: "Jane Doe",
      },
    ],
  };

  const typeDefs = schema.typeDefs(data);
  const resolvers = schema.resolvers(data);

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  apolloServer
    .listen()
    .then(({ url }) =>
      console.log(
        `🚀 ${chalk.bold(`GraphQL Server ready at`)} ${chalk.cyan.bold(
          `${url}`
        )}`
      )
    );
};

module.exports = { server, graphQLServer };
