import React from "react";
import ReactDOM from "react-dom";

// Routing
import { Router } from "react-router-dom";
import history from "./history.js";

// Providers
import Providers from "components/Providers/";

import App from "./App.js";
import "SCSS/";

ReactDOM.render(
  <Router history={history}>
    <Providers>
      <App />
    </Providers>
  </Router>,
  document.getElementById("root")
);
