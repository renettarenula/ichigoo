/**
 * SPA app needs to be hydrated.
 * This file will be shipped alongside our other assets.
 */
import React from "react";
import { hydrate } from "react-dom";
import App from "./app.js";

hydrate(<App />, document.getElementById("content"));
