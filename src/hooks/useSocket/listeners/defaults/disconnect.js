export default function disconnect() {
  console.log("Lost connection to socket manager");
  this.status.setIsConnected(false);
}
