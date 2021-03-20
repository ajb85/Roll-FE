import store from 'store.js';
import { updateGame } from 'reducers/games.js';

const playGame = {
  turns: newData => {
    console.log('TURN TAKEN!');
    store.dispatch(updateGame(newData.game_id, newData));
  },
  gameEnd: message => {
    console.log('GAME ENDING: ', message);
  }
};

export default playGame
