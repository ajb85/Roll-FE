import io from 'socket.io-client';
import listeners from './listeners/';
import defaultListeners from './listeners/defaults/';
import store from '../store.js';

class Socket {
  constructor() {
    this.io = io;
    this.socket = this.io.connect(process.env.REACT_APP_API_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });

    // App should immediately identify itself to the socket manager
    this._identify();

    // Record of everything, beyond the default, that this socket is listening to
    this.subscribedTo = {};

    this.listeners = listeners;
    this.redux = store;

    defaultListeners.forEach(({ room, callback }) => {
      // Turn on every listener that every instance of the app
      // should have on
      this._listen(room, callback, true);
    });

    // Track app status
  }

  emit(room, data) {
    this._identify();

    return this.socket.emit(room, data);
  }

  subscribeToGames(games) {
    console.log('SUBSCRIBING TO: ', games);
    return this.emit('joinGames', games);
  }

  join(room) {
    this._listen(room, (context, message) => {
      this.listeners.game[context](message);
    });
  }

  joinList(games) {
    games.forEach(room => this.join(room));
  }

  _listen(room, cb, skipBESub) {
    this.subscribedTo[room] = true;

    if (!skipBESub) {
      this.subscribeOnBE(room);
    }

    return this.socket.on(room, cb.bind(this));
  }

  subscribeOnBE(room) {
    this.socket.emit('subscribe', room);
  }

  _identify() {
    const token = localStorage.getItem('token');
    if (!this.identified && token) {
      this.socket.emit('identify', token);
      this.identified = true;
    }
  }
  _dispatch(action) {
    this.redux.dispatch(action);
  }
}

export default new Socket();
