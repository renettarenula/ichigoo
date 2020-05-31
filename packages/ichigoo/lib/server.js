var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
var utils = require("./ops/utils.js");
var chalk = require("chalk");
var apollo = require("apollo-server");
var schema = require("./graphql/Schema.js");
var markdown = require("./ops/markdown.js");
var DataCollection = require("./ops/collection").DataCollection;

const server = () => {
  var app = express();
  app.use(serveStatic(path.join(utils.dir(), "dist"), { extensions: ["html"] }));

  var port = process.env.PORT || 5000;
  app.listen(port);

  console.log(chalk.cyan.bold("Start server at port 5000"));
};

const graphQLServer = async () => {
  const ApolloServer = apollo.ApolloServer;
  const markdownData = await markdown.getMarkdownSource();

  if (!markdownData) {
    return;
  }

  DataCollection.add(markdownData);

  const data = DataCollection.data();
  const typeDefs = schema.typeDefs(data);
  const resolvers = schema.resolvers(data);

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  apolloServer
    .listen()
    .then(({ url }) =>
      console.log(`🚀 ${chalk.bold(`GraphQL Server ready at`)} ${chalk.cyan.bold(`${url}`)}`)
    );
};

module.exports = { server, graphQLServer };
