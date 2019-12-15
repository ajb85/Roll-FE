import manageGame from './manageGame/';
import playGame from './playGame/';

export default { game: { ...manageGame, ...playGame } };
