import { useRef, memo } from "react";

import Prompt from "components/Prompt/";
import PlayerVotes from "./PlayerVotes";

import { goHome, getRandomItemFromArray } from "js/utility.js";
import { useAccount } from "hooks/";
import voteMessages from "./voteMessages.json";

import styles from "./GameOverPrompt.module.scss";

export default memo(function GameOverPrompt(props) {
  const { game } = props;
  const gameIsOver = game.currentRound >= 13;
  const { account } = useAccount();
  const userIsWinnerRef = useRef(false);

  if (!gameIsOver) {
    return null;
  }

  const winnerList = Object.values(game.scores).reduce((winners, { isWinner, username }) => {
    if (isWinner) {
      if (username === account.username) {
        userIsWinnerRef.current = true;
        winners.push("You");
      } else {
        winners.push(username);
      }
    }
    return winners;
  }, []);

  return (
    <Prompt
      isOpen
      cancel={goHome}
      secondaryButton={{ label: "Go Back", onClick: goHome }}
      className={styles.gameOver}
    >
      <h2>Game Over</h2>
      <p>{getWinners(winnerList)} won!</p>
      <span>{getVoteMessage(userIsWinnerRef.current)}</span>
      <PlayerVotes game={game} />
    </Prompt>
  );
});

function getWinners(winnerList) {
  if (winnerList.length === 1) {
    return winnerList[0];
  }

  const lastWinner = winnerList.pop();
  return `${winnerList.join(", ")}, and ${lastWinner}}`;
}

function getVoteMessage(isWinner) {
  const key = isWinner ? "winner" : "loser";
  return getRandomItemFromArray(voteMessages[key]);
}
