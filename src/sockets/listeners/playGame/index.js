export default {
  turns: message => {
    console.log('TURN TAKEN: ', message);
  },
  gameEnd: message => {
    console.log('GAME ENDING: ', message);
  }
};
