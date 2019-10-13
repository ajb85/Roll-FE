import io from 'socket.io-client';
import store from './store.js';
export const socket = io.connect(process.env.REACT_APP_API_URL);

class SocketsManager {
  constructor() {
    this.socket = socket;
    this.startListeners();
  }

  startListeners() {
    this.socket.on('error', function(err) {
      console.log('received socket error:', err);
    });
  }

  emit(room, payload) {
    this.socket.emit(room, payload);
  }

  listen(room, cb) {
    this.socket.on(room, res => {
      cb(res);
    });
  }
}

export default new SocketsManager();
