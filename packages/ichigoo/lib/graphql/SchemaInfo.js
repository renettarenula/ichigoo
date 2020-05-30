import getSchemaFromData from "./introspection/getSchemaFromData";
import { printSchema } from "graphql";
import resolver from "./resolver/index.js";

const typeDefs = (data) => {
  return printSchema(getSchemaFromData(data));
};

const resolvers = (data) => {
  return resolver(data);
};

export { typeDefs, resolvers };
