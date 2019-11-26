import store from 'store.js';
import { updateGame } from 'reducers/games.js';

export default {
  turns: newData => {
    console.log('TURN TAKEN!');
    store.dispatch(updateGame(newData.game_id, newData));
  },
  gameEnd: message => {
    console.log('GAME ENDING: ', message);
  }
};
