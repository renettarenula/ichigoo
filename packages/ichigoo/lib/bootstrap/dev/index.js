/**
 * The JS that is served for the local environment.
 * We get the App JS file from the generated project.
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "~/src/App.js";

const Element = () => {
  return <App />;
};

let Content = document.getElementById("content");

ReactDOM.render(<Element />, Content);
