import React from "react";
import { Switch, Route, StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

const Main = ({ routes }) => {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} component={component} key={key} />
  ));

  return <Switch>{routeComponents}</Switch>;
};

const Markup = ({ route, routes }) => {
  return (
    <StaticRouter location={route.path}>
      <Main routes={routes} />
    </StaticRouter>
  );
};

const SSR = (route, routes) => {
  return ReactDOMServer.renderToString(
    <Markup route={route} routes={routes} />
  );
};

export default SSR;
