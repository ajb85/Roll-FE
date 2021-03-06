import React from "react";

import styles from "./styles.module.scss";

function LoadingDice({ fontSize = "1.2rem", dice = [1, 2, 3] }) {
  const conversion = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
  };
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
          <p
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${dice.length / 2}s`,
              fontSize,
            }}
          >{`dice-${conversion[d]}`}</p>
        </div>
      ))}
    </div>
  );
}

export default LoadingDice;
