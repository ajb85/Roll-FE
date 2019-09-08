import axios from 'axios';
import store from './store.js';
import { setToken } from './reducers/account.js';
import { loading, doneLoading, logError, clearErrors } from './reducers/app.js';
// import { gettingGames, gotGames } from './reducers/account.js';
import history from 'history.js';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`;

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled
    ? false
    : true;
};

axios.interceptors.request.use(req => {
  store.dispatch(loading());
  handleGameRoute({ req });
  const state = store.getState();
  const token = state.account.token;
  req.headers.authorization = token;
  return req;
});

axios.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

function successHandler(res) {
  store.dispatch(doneLoading());
  handleGameRoute({ res });

  // May have to update to accept requestTypes for
  // specific successful actions and clear that section
  store.dispatch(clearErrors());
  if (res.data.token) {
    const { token, ...account } = res.data;
    res.data = account;
    store.dispatch(setToken(token));
  }
  return res;
}

function errorHandler(err) {
  store.dispatch(doneLoading());
  handleGameRoute({ res: err.response });
  if (err.response && err.response.status === 404) {
    history.push('/');
  }
  console.log('ERROR: ', err);
  if (err.response && err.response.data.requestType) {
    store.dispatch(
      logError(err.response.data.requestType, err.response.data.message)
    );
  } else if (err.response && err.response.status === 401) {
    store.dispatch(setToken());
  } else if (isHandlerEnabled(err.config)) {
    console.log('config', err.config);
  } else {
    console.log('NO CONFIG: ', err);
  }
}

function handleGameRoute(routeFunction) {
  // const { req, res, err } = routeFunction;
  // if (req && req.url.split('/').filter(x => x)[0] === 'games') {
  //   store.dispatch(gettingGames());
  // } else if (
  //   res &&
  //   res.config &&
  //   res.config.url &&
  //   checkURLForGames(res.config.url)
  // ) {
  //   store.dispatch(gotGames());
  // } else if (err) {
  //   console.log('GAME ROUTE: ', err.response);
  // }
}

// function checkURLForGames(url) {
//   return (
//     url.substring(axios.defaults.baseURL.length + 1).split('/')[0] === 'games'
//   );
// }
