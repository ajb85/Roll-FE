export default function connect() {
  console.log("Connected to socket manager");

  if (Object.keys(this.subscribedTo).length) {
    // On a reconnection, the FE may be listening to things that
    // the BE is no longer following for this socket (after a connection drop)
    // So if the FE thinks it's listening to anything, tell the BE to re-subscribe
    // to it
    for (let room in this.subscribedTo) {
      this.emit("subscribe", room);
    }
  }
}
