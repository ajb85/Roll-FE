export default function gameUpdates(game) {
  const { game_id } = game;
  this.games.update(game_id, game);
}
