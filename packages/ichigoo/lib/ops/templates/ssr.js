import React from "react";
import { Switch, Route, StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema } from "graphql-tools";
import { InMemoryCache } from "apollo-boost";
var gqlSchema = require("ichigoo/lib/graphql/Schema.js");

const data = {
  posts: [
    {
      id: 1,
      slug: "/blog/my-first-post",
      date: "2019-05-04",
      title: "My first blog post",
      content: "\n" + "This is my first blog post. Would you like to see what else is there?\n",
    },
    {
      id: 3,
      slug: "/blog/my-second-post",
      date: "2019-05-04",
      title: "My second blog post",
      content: "\nThis is my second blog post. It looks great isn't it?\n",
    },
    {
      id: 2,
      slug: "/blog/my-third-post",
      date: "2019-05-04",
      title: "My third blog post",
      content:
        "\n" +
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus\n" +
        "\n" +
        "This is second paragraph. habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus\n",
    },
  ],
};

const typeDefs = gqlSchema.typeDefs(data);
const resolvers = gqlSchema.resolvers(data);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const client = new ApolloClient({
  ssrMode: true,
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});

const Main = ({ routes }) => {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return <Switch>{routeComponents}</Switch>;
};

const Markup = ({ route, routes }) => {
  return (
    <ApolloProvider client={client}>
      <StaticRouter location={route.path}>
        <Main routes={routes} />
      </StaticRouter>
    </ApolloProvider>
  );
};

const SSR = (route, routes) => {
  return ReactDOMServer.renderToString(<Markup route={route} routes={routes} />);
};

export default SSR;
export { client, Markup };
