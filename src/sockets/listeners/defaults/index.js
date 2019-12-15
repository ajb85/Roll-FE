import error from './error.js';
import connect from './connect.js';
import disconnect from './disconnect.js';
import subscribe from './subscribe.js';

export default [
  { room: 'error', callback: error },
  { room: 'connect', callback: connect },
  { room: 'disconnect', callback: disconnect },
  { room: 'subscribe', callback: subscribe }
];
