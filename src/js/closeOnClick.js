const subs = {};

export function closeEverythingOnClick() {
  Object.values(subs).forEach((cb) => cb());
}

export function addSubscription(name, cb) {
  subs[name] = cb;

  return () => delete subs[name];
}
