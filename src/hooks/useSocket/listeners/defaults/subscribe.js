import listeners from "../";

export default function subscribe(room, cb) {
  console.log("Subscribing to ", room);

  if (!cb && listeners[room]) {
    // If no callback was supplied but one exists in the listeners, use it
    cb = listeners[room];
  }

  if (cb) {
    this.listen(room, cb);
  }
}
