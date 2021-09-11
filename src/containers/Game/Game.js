import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

import ErrorMessage from "components/ErrorMessage/";
import LoadingDice from "components/LoadingDice/";
import Prompt from "components/Prompt/";

import GameTitle from "./GameTitle.js";
import PlayerList from "components/PlayerList/";
import ScoreTable from "./ScoreTable.js";
import Dice from "./Dice.js";
import PlayButtons from "./PlayButtons.js";

import { useAccount, useGames, useLockedDice, useInviteLink, useScreenSize } from "hooks";
import { goHome } from "js/utility.js";

import styles from "./Game.module.scss";

export default function Game(props) {
  const { game_id } = useParams();
  const { user_id } = useAccount();
  const { isMobile } = useScreenSize();
  const { gamesLookup, submitScore, gamesAreLoading: isLoading } = useGames();
  const { lockedDice, toggleLockOnDie, resetLockedDice } = useLockedDice();

  const [viewingPlayer, setViewingPlayer] = useState(Number(user_id));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [link, linkIsLoading, linkError, setLinkError] = useInviteLink(showPrompt);

  const isViewingSelf = viewingPlayer === user_id;
  const activeGame = gamesLookup[game_id];
  const isOwner = activeGame && Number(activeGame.owner) === Number(user_id);

  const viewPlayer = useCallback(
    (e) => setViewingPlayer(Number(e.target.dataset.player)),
    [setViewingPlayer]
  );

  const endRound = useCallback(() => {
    submitScore(game_id, selectedCategory);
    resetLockedDice();
    setViewingPlayer(Number(user_id));
    setSelectedCategory("");
    setShowPrompt(false);
  }, [
    submitScore,
    resetLockedDice,
    setViewingPlayer,
    setSelectedCategory,
    selectedCategory,
    game_id,
    user_id,
    setShowPrompt,
  ]);

  const promptOn = useCallback(() => {
    if (isOwner) {
      setShowPrompt(true);
    }
  }, [isOwner, setShowPrompt]);

  const promptOff = useCallback(() => {
    setShowPrompt(false);
    setLinkError(false);
  }, [setShowPrompt, setLinkError]);

  const toggleCategory = useCallback(
    (e) => {
      const category = e.target.id.split("categoryName").pop();
      setSelectedCategory(category === selectedCategory ? "" : category);
    },
    [selectedCategory, setSelectedCategory]
  );

  useEffect(() => {
    if (user_id && !viewingPlayer) {
      setViewingPlayer(Number(user_id));
    }
  }, [user_id, viewingPlayer]);

  if (!activeGame) {
    // Loading state
    return (
      <div style={{ paddingTop: "50px" }}>
        <LoadingDice />
        <p style={{ textAlign: "center", marginTop: "25px" }}>Loading Game</p>
      </div>
    );
  }

  if (!activeGame.scores) {
    return (
      <div style={{ paddingTop: "50px" }}>
        <ErrorMessage message="Whoops, I couldn't find this game" />
        <Link to="/" className={styles.backToLobby}>
          Back To Lobby
        </Link>
      </div>
    );
  }

  const winnerList = Object.values(activeGame.scores).reduce((winners, { isWinner, username }) => {
    if (isWinner) {
      winners.push(username);
    }
    return winners;
  }, []);

  return (
    <div className={styles.Game}>
      {showPrompt && (
        <Prompt
          isOpen={showPrompt}
          primaryButton={{ copy: link, disabled: !link }}
          close={promptOff}
        >
          <h2>Send this link to a friend to have them automatically join:</h2>
          {linkError ? (
            <p>Error creating link {":("}</p>
          ) : linkIsLoading ? (
            <LoadingDice />
          ) : (
            <p className={styles.linkText}>{link}</p>
          )}
        </Prompt>
      )}
      <GameTitle
        game={activeGame}
        showPrompt={showPrompt}
        promptOn={promptOn}
        promptOff={promptOff}
        isOwner={isOwner}
      />
      <div className={isMobile ? styles.noFlex : styles.flex}>
        <PlayerList game={activeGame} viewPlayer={viewPlayer} viewingPlayer={viewingPlayer} />
        <div className={styles.tableWrapper}>
          <ScoreTable
            game={activeGame}
            viewingPlayer={viewingPlayer}
            viewPlayer={viewPlayer}
            selectedCategory={selectedCategory}
            toggleCategory={toggleCategory}
          />

          {activeGame.isActive > 0 && isViewingSelf && (
            // Dice hide when the game is complete
            <Dice game={activeGame} lockedDice={lockedDice} toggleLockOnDie={toggleLockOnDie} />
          )}
          {activeGame.isActive > 0 && isViewingSelf && (
            // Buttons hide when the game is complete
            <PlayButtons
              game={activeGame}
              endRound={endRound}
              lockedDice={lockedDice}
              selectedCategory={selectedCategory}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
      <ErrorMessage type="play" />
      <Prompt
        isOpen={activeGame.currentRound >= 13}
        cancel={goHome}
        secondaryButton={{ label: "Go Back", onClick: goHome }}
      >
        <h2>Game Over</h2>
        <p>{getWinners(winnerList)} won!</p>
      </Prompt>
    </div>
  );
}

function getWinners(winnerList) {
  if (winnerList.length === 1) {
    return winnerList[0];
  }

  const lastWinner = winnerList.pop();
  return `${winnerList.join(", ")}, and ${lastWinner}}`;
}
