import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store.js";

// Routing
import { Router } from "react-router-dom";
import history from "./history.js";

// Axios interceptors
import "./interceptors/";

// Providers
import Providers from "providers/";

import App from "./App.js";
import "SCSS/";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Providers>
        <App />
      </Providers>
    </Router>
  </Provider>,
  document.getElementById("root")
);
