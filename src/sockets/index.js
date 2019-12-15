import io from 'socket.io-client';
import listeners from './listeners';

class SocketsManager {
  constructor() {
    this.io = io;
    this.socket = this.io.connect(`${process.env.REACT_APP_API_URL}:4500`, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
    this.listeners = listeners;
    this.subscribedTo = {};
    this.socket.on('connect', () => {
      console.log('HEY LOOK I FUCKING CONNECTED');
    });
    listeners.defaults.forEach(({ room, callback }) => {
      this._listen(room, callback, true);
    });

    this._identify();
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
    console.log('ID');

    const token = localStorage.getItem('token');
    if (!this.identified && token) {
      console.log(token);
      this.socket.emit('identify', token);
      this.identified = true;
    }
  }
}

export default new SocketsManager();
