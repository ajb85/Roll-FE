import connect from './connect.js';
import disconnect from './disconnect.js';
import error from './error.js';

export default [
  { room: 'error', callback: error },
  //   { room: 'connect', callback: connect },
  { room: 'disconnect', callback: disconnect }
];
