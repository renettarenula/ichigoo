/**
 * In order for me to avoid transpiling in this directory,
 * I am copying this file to the main project so that it can
 * be transpiled directly by parcel when we run build.
 *
 * These are helper function to handle prerendering.
 * This file will never run in the browser so we can include whatever
 * node specific modules necessary to get prerendering to work.
 * Also, this file will be deleted from the main project post build.
 */

import React from "react";
import { Switch, Route, StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema } from "graphql-tools";
import { InMemoryCache } from "apollo-boost";
// Remember that this will be copied to main project.
// So this is how we should access current durectory
const gqlSchema = require("ichigoo/lib/graphql/Schema.js");
const getMarkdownSource = require("ichigoo/lib/ops/markdown.js").getMarkdownSource;

/**
 * Construct Apollo Client for prerendering.
 * We will get Markdown data first in order to
 * form the type definitions and resolvers
 */
const getClient = async () => {
  const data = await getMarkdownSource();

  if (!data) {
    console.log("You don't seem to have any markdown data to render. Moving on.");
    return;
  }

  const typeDefs = gqlSchema.typeDefs(data);
  const resolvers = gqlSchema.resolvers(data);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });
};

const Main = ({ routes }) => {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return <Switch>{routeComponents}</Switch>;
};

const Markup = ({ route, routes, client }) => {
  return (
    <ApolloProvider client={client}>
      <StaticRouter location={route.path}>
        <Main routes={routes} />
      </StaticRouter>
    </ApolloProvider>
  );
};

const SSR = (route, routes, client) => {
  return ReactDOMServer.renderToString(<Markup route={route} routes={routes} client={client} />);
};

export default SSR;
export { getClient, Markup };
