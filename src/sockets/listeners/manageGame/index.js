import store from 'store.js';
import { updateGame } from 'reducers/games.js';

const manageGame = {
  userList: newData => {
    console.log('Users updating');
    store.dispatch(updateGame(newData.game_id, newData));
  }
};

export default manageGame;
