import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import ScoreTable from './ScoreTable/';

import { rollTheDice, submitScore } from 'reducers/games.js';
import { showHeader, hideHeader } from 'reducers/app.js';

import { isUsersTurn, getGameRound } from 'js/rounds.js';
import history from 'history.js';

import { colorContext } from 'js/Colors.js';
import { Table } from './Styles.js';
import styles from './styles.module.scss';

function Game(props) {
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [selected, setSelected] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const { colors } = useContext(colorContext);

  const params = useParams();
  const game = props.games.find(g => g.name === params.name);

  useEffect(() => {
    if (game && props.user_id) {
      setIsTurn(isUsersTurn(game.scores, props.user_id));
    }
  }, [game, props.user_id]);

  const { gamesWereFetched, showHeader, hideHeader } = props;

  const toggleLockOnDie = index => {
    setLocked(locked.map((d, i) => (i === index ? !d : d)));
  };

  const endRound = () => {
    props.submitScore(game.game_id, selected);
    setSelected(null);
    setLocked([false, false, false, false, false]);
  };

  const turns = game && game.rolls ? 3 - game.rolls.length : 3;

  const dice =
    game && game.rolls && game.rolls.length
      ? game.rolls[game.rolls.length - 1]
      : [];

  const defaultDice = [
    <img src={require('img/R.png')} key={'R'} alt="R die" />,
    <img src={require('img/O.png')} key={'O'} alt="O die" />,
    <img src={require('img/L.png')} key={'L1'} alt="L die" />,
    <img src={require('img/L.png')} key={'L2'} alt="L die" />,
    <img src={require('img/e.png')} key={'!'} alt="! die" />
  ];

  useEffect(() => {
    hideHeader();
    return () => showHeader();
  }, [hideHeader, showHeader]);

  if (!gamesWereFetched) {
    // Loading state
    return <p className={styles.error}>Loading...</p>;
  }

  if (!game) {
    // Wrong URL state
    // setTimeout(() => (game ? null : history.push('/')), 1500);
    return <p className={styles.error}>You are not in this game</p>;
  }
  // Default went well state
  return (
    <div className={styles.Game}>
      <table className={styles.stats}>
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
              Back to
            </th>
            <th>Game</th>
            <th>Players</th>
            <th>Round</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ cursor: 'pointer' }} onClick={() => history.push('/')}>
              Lobby
            </td>
            <td>{game.name}</td>
            <td>{game.playerCount}</td>
            <td>{getGameRound(game ? game.scores : [])}</td>
          </tr>
        </tbody>
      </table>

      <Table
        colors={colors}
        className={styles.score}
        style={{ opacity: isTurn ? 1 : 0.5 }}
      >
        <thead>
          <tr>
            <th>Type</th>
            <th>You</th>
            <th>Top</th>
            <th>Type</th>
            <th>You</th>
            <th>Top</th>
          </tr>
        </thead>
        <ScoreTable
          game={game}
          selected={selected}
          setSelected={setSelected}
          isTurn={isTurn}
        />
      </Table>
      <section className={styles.dice}>
        {dice && dice.length
          ? dice.map((_, i) => (
              <img
                key={i}
                onClick={() => toggleLockOnDie(i)}
                src={require(`../../../img/${dice[i]}${
                  locked[i] ? 'l' : ''
                }.png`)}
                alt="die"
              />
            ))
          : defaultDice}
      </section>
      <section className={styles.buttons}>
        <img
          onClick={() => props.rollTheDice(game.game_id, locked)}
          src={require(`../../../img/roll${turns}.png`)}
          alt={`Roll the dice. ${turns || 0} rolls left`}
          style={{
            opacity: isTurn && (!game.rolls || game.rolls.length < 3) ? 1 : 0.5
          }}
        />
        <img
          onClick={() => {
            endRound();
          }}
          src={require('../../../img/submit.png')}
          alt={`Submit turn`}
          style={{ opacity: selected && isTurn ? 1 : 0.5 }}
        />
      </section>
      <p className={styles.error}>{props.error}</p>
    </div>
  );
}

const mapStateToProps = state => ({
  user_id: state.account.id,
  gamesWereFetched: state.games.wereFetched,
  games: state.games.active,
  error: state.app.errors.play
});

export default connect(mapStateToProps, {
  showHeader,
  hideHeader,
  rollTheDice,
  submitScore
})(Game);
