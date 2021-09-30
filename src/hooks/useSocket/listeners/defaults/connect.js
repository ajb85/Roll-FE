let isInitialConnect = true;

export default function connect() {
  console.log("Connected to socket manager.  Is initial?", isInitialConnect);
  this.status.setIsConnected(true);
  if (!isInitialConnect) {
    console.log("Checking for updates for", this.games.activeIds);
    this.games.activeIds.forEach((gameId) => {
      const emitId = this.emitLog[gameId];
      this.socket.emit("missedUpdates", gameId, emitId);
    });
  } else {
    isInitialConnect = false;
  }
}
