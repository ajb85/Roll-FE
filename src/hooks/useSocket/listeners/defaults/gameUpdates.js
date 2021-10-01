export default function gameUpdates(game, emit_id) {
  const isLog = game?.logs;
  const game_id = isLog ? game.logs[0]?.game_id : game?.game_id;

  if (game_id) {
    emit_id && (this.emitLog[game_id] = emit_id);
    this.games.update(game_id, game);
  }
}
