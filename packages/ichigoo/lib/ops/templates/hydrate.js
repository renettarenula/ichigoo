/**
 * SPA app needs to be hydrated.
 * This file will be shipped alongside our other assets.
 */
import "regenerator-runtime/runtime";
import React from "react";
import { hydrate } from "react-dom";
import App from "./app.js";
import data from "./data.graphql.json";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "ichigoo/lib/graphql/SchemaInfo.js";

const type = typeDefs(data);
const resolver = resolvers(data);

hydrate(
  <App data={makeExecutableSchema({ typeDefs: type, resolvers: resolver })} />,
  document.getElementById("content")
);
