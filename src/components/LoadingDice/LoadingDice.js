import React from "react";

import Die from "components/Die/";

import styles from "./styles.module.scss";

function LoadingDice({ fontSize = "1.2rem", dice = [1, 2, 3] }) {
  return (
    <div className={styles.loadingDice}>
      {dice.map((d, i) => (
        <div
          key={`${d} at ${i}`}
          style={{
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${dice.length / 2}s`,
          }}
        >
          <Die
            innerStyle={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${dice.length / 2}s`,
              fontSize,
            }}
            face={d}
            size="small"
          />
        </div>
      ))}
    </div>
  );
}

export default LoadingDice;
