import io from 'socket.io-client';
import listeners from './listeners';

class SocketsManager {
  constructor() {
    this.io = io;
    this.socket = this.io.connect(process.env.REACT_APP_API_URL);
    this.listeners = listeners;

    this.errorHandling();
  }

  errorHandling() {
    return this.socket.on('error', function(err) {
      console.log('received socket error:', err);
    });
  }

  emit(room, data) {
    return this.socket.emit(room, data);
  }

  subscribeToGames(games) {
    return this.emit('joinGames', games);
  }

  listen(room, cb) {
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
