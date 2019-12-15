import manageGame from './manageGame/';
import playGame from './playGame/';

import defaults from './defaults/';

export default { game: { ...manageGame, ...playGame }, defaults };
