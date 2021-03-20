export default function subscribe(room, cb) {
  console.log('Subscribing to ', room);

  if (!cb && this.listeners[room]) {
    // If no callback was supplied but one exists in the listeners, use it
    cb = this.listeners[room];
  }

  if (cb) {
    this._listen(room, cb);
  }
}
