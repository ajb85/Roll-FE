import { io } from "socket.io-client";
import listeners from "./listeners/";
import defaultListeners from "./listeners/defaults/";
import store from "../store.js";

class Socket {
  constructor() {
    this.io = io;

    if (!this._startSocket()) {
      this.unsub = store.subscribe(() => {
        if (this._startSocket()) {
          this.unsub();
        }
      });
    }
  }

  emit(room, data) {
    return this.socket.emit(room, data);
  }

  subscribeToGames(games) {
    console.log("SUBSCRIBING TO: ", games);
    return this.emit("joinGames", games);
  }

  join(room) {
    this._listen(room, (context, message) => {
      this.listeners.game[context](message);
    });
  }

  joinList(games) {
    games.forEach((room) => this.join(room));
  }

  _listen(room, cb, skipBESub) {
    this.subscribedTo[room] = true;

    if (!skipBESub) {
      this.subscribeOnBE(room);
    }

    return this.socket.on(room, cb.bind(this));
  }

  subscribeOnBE(room) {
    this.socket.emit("subscribe", room);
  }

  _dispatch(action) {
    this.redux.dispatch(action);
  }

  _startSocket() {
    const { token } = store.getState().account;

    if (token) {
      console.log("ESTABLISHING SOCKET");
      this.socket = this.io(process.env.REACT_APP_API_URL, {
        auth: { token },
      });

      // Record of everything, beyond the default, that this socket is listening to
      this.subscribedTo = {};

      this.listeners = listeners;
      this.redux = store;

      defaultListeners.forEach(({ room, callback }) => {
        // Turn on every listener that every instance of the app
        // should have on
        this._listen(room, callback, true);
      });
    } else {
      console.log("NO SOCKET");
    }

    return !!token;
  }
}

export default new Socket();
