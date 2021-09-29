export default function connect() {
  console.log("Connected to socket manager");
  this.status.setIsConnected(true);
}
