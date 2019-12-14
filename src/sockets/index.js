import io from 'socket.io-client';
import listeners from './listeners';

class SocketsManager {
  constructor() {
    this.io = io;
    this.socket = this.io.connect(`${process.env.REACT_APP_API_URL}:4500`);
    this.listeners = listeners;

    this.socket.on('error', function(err) {
      console.log('received socket error:', err);
    });

    this.emit('identify', localStorage.getItem('token'));
  }

  emit(room, data) {
    return this.socket.emit(room, data);
  }

  subscribeToGames(games) {
    console.log('SUBSCRIBING TO: ', games);
    return this.emit('joinGames', games);
  }

  listen(room, cb) {
    console.log('LISTENING FOR: ', room);
    return this.socket.on(room, cb);
  }

  join(room) {
    this.listen(room, (context, message) => {
      this.listeners.game[context](message);
    });
  }

  joinList(games) {
    games.forEach(room => this.join(room));
  }
}

export default new SocketsManager();
