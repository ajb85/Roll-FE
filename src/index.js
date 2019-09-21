import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history.js';
import store from './store.js';

// Axios interceptors
import './interceptors.js';

// Environment Variables

import App from './App.js';
import 'SCSS/';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
