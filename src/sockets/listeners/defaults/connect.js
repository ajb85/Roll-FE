export default function() {
  console.log('Connected to socket server.');
  this._identify();

  if (Object.keys(this.subscribedTo).length) {
    for (let room in this.subscribedTo) {
      this.subscribeOnBE(room);
    }
  }
}
