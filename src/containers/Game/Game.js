import { useState, useCallback, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import ErrorMessage from "components/ErrorMessage/";
import LoadingDice from "components/LoadingDice/";
import Prompt from "components/Prompt/";
import GameOverPrompt from "components/GameOverPrompt/";

import GameTitle from "components/GameTitle/";
import PlayerList from "components/PlayerList/";
import GameTable from "components/ScoreTable";
import Dice from "./Dice.js";
import PlayButtons from "./PlayButtons.js";

import {
  useAccount,
  useGames,
  useLockedDice,
  useInviteLink,
  useScreenSize,
  useViewingPlayer,
} from "hooks";

import { combineClasses } from "js/utility.js";

import styles from "./Game.module.scss";

export default function Game(props) {
  const { game_id } = useParams();
  const history = useHistory();
  const { user_id } = useAccount();
  const { isDesktop } = useScreenSize();
  const { gamesLookup, submitScore, gamesAreLoading: isLoading } = useGames();
  const { lockedDice, toggleLockOnDie, resetLockedDice } = useLockedDice();
  const { setViewingPlayer, setViewSelf } = useViewingPlayer();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menu, setMenu] = useState("game");
  const [showPrompt, setShowPrompt] = useState(false);
  const [link, linkIsLoading, linkError, setLinkError] = useInviteLink(showPrompt);

  const activeGame = gamesLookup[game_id];
  const isOwner = activeGame && Number(activeGame.owner) === Number(user_id);

  const viewSelfOnDieToggle = useCallback(
    (e) => {
      toggleLockOnDie(e);
      setViewSelf();
    },
    [toggleLockOnDie, setViewSelf]
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

  const toggleMenu = useCallback(() => {
    setMenu(menu === "game" ? "players" : "game");
  }, [menu, setMenu]);

  const resetCategoryOnViewPlayer = useCallback(
    (e) => {
      setViewingPlayer(e);
      setSelectedCategory("");
    },
    [setViewingPlayer, setSelectedCategory]
  );

  useEffect(() => {
    if (activeGame) {
      const { newGame, votesComplete } = activeGame;
      const vote = activeGame?.votes?.[user_id]?.vote;

      if (votesComplete) {
        history.push(vote && newGame ? `/game/play/${newGame}` : "/");
      }
    }
  }, [activeGame, user_id, history]);

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
        menu={menu}
        toggleMenu={toggleMenu}
      />
      <div className={isDesktop ? styles.flex : styles.noFlex}>
        {(isDesktop || menu === "players") && (
          <PlayerList
            setViewingPlayer={resetCategoryOnViewPlayer}
            game={activeGame}
            setMenu={setMenu}
          />
        )}
        {(isDesktop || menu === "game") && (
          <div
            className={combineClasses(styles.tableWrapper, !isDesktop && styles.mobileTableWrapper)}
          >
            <GameTable
              game={activeGame}
              selectedCategory={selectedCategory}
              toggleCategory={toggleCategory}
            />

            {activeGame.isActive > 0 && (
              // Dice hide when the game is complete
              <Dice
                game={activeGame}
                lockedDice={lockedDice}
                toggleLockOnDie={viewSelfOnDieToggle}
              />
            )}

            {activeGame.isActive > 0 && (
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
        )}
      </div>
      <ErrorMessage type="play" />
      <GameOverPrompt game={activeGame} />
    </div>
  );
}
