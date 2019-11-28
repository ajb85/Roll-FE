import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store.js';

// Routing
import { Router } from 'react-router-dom';
import history from './history.js';

// Axios interceptors
import './interceptors/';

// Providers
import ColorProvider from 'js/Colors.js';

import App from './App.js';
import 'SCSS/';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ColorProvider>
        <App />
      </ColorProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
