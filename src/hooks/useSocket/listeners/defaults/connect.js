let isInitialConnect = true;

export default function connect() {
  console.log("Connected to socket manager.");
  this.status.setIsConnected(true);
  if (!isInitialConnect) {
    this.games.activeIds.forEach((gameId) => {
      const emitId = this.emitLog[gameId];
      this.socket.emit("missedUpdates", gameId, emitId);
    });
  } else {
    isInitialConnect = false;
  }
}
