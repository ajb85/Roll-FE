export default function gameUpdates(game, emit_id) {
  const game_id = game?.game_id || game?.log?.[0]?.game_id;
  if (game_id) {
    emit_id && (this.emitLog[game_id] = emit_id);
    this.games.update(game_id, game);
  }
}
