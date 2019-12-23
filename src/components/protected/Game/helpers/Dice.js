import React from 'react';

import styles from '../styles.module.scss';

function Dice({ isTurn, dice, toggleLockOnDie, locked }) {
  return (
    <section className={styles.dice}>
      {dice && dice.length ? (
        dice.map((_, i) => (
          <img
            key={i}
            onClick={() => toggleLockOnDie(i)}
            src={require(`../../../../img/${dice[i]}${
              locked[i] ? 'l' : ''
            }.png`)}
            alt='die'
          />
        ))
      ) : (
        <RollDice isTurn={isTurn} />
      )}
    </section>
  );
}

function RollDice({ isTurn }) {
  return (
    <>
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={require('img/R.png')}
        key={'R'}
        alt='R die'
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={require('img/O.png')}
        key={'O'}
        alt='O die'
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={require('img/L.png')}
        key={'L1'}
        alt='L die'
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={require('img/L.png')}
        key={'L2'}
        alt='L die'
      />
      <img
        style={{ opacity: isTurn ? 1 : 0.5 }}
        src={require('img/e.png')}
        key={'!'}
        alt='! die'
      />
    </>
  );
}

export default Dice;
