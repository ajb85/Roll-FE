export default function gameUpdates(game) {
  console.log("FOUND GAME UPDATE: ", game);
  const { game_id } = game;
  this.games.update(game_id, game);
}
