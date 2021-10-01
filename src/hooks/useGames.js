import { useState, createContext, useContext, useCallback, useRef } from "react";
import { useHistory } from "react-router";

import { mergeObjects } from "js/utility.js";

import { useAxios } from "./";

const context = createContext();
const { Provider } = context;

export function GamesProvider(props) {
  const [axios, gamesAreLoading] = useAxios();
  const fetchedGames = useRef(false);
  const history = useHistory();

  const [games, setGames] = useState([]);
  const gamesLookup = getGamesLookup(games);

  const getUsersGames = useCallback(
    async (forceFetch) => {
      if (forceFetch || !fetchedGames.current) {
        fetchedGames.current = true;
        const userGames = await axios.get("/games/user");
        if (userGames) {
          setGames(userGames);
        }
      }
    },
    [axios, setGames]
  );

  const addGame = async (gameInfo, type = "create") => {
    const url = urls[type];
    const newGame = await axios.post(url, gameInfo);
    if (newGame && newGame.game_id) {
      setGames([...games, newGame]);
      setTimeout(() => history.push(`/game/play/${newGame.game_id}`));
      return true;
    }
    return false;
  };

  const leaveGame = async (game_id) => {
    const leaving = await axios.delete(`games/user/leave/${game_id}`);
    if (leaving) {
      setGames(games.filter((g) => Number(game_id) !== Number(g.game_id)));
    }
  };

  const rollTheDice = async (game_id, locked) => {
    const url = `/games/play/${game_id}/rollDice`;
    const newRoll = await axios.post(url, { locked });
    if (newRoll) {
      const { rolls } = newRoll;
      setGames(games.map((g) => (g.game_id === game_id ? { ...g, rolls } : g)));
    }
  };

  const submitScore = async (game_id, category) => {
    const url = `/games/play/${game_id}/submitRound`;
    const gameUpdate = await axios.post(url, { category });

    if (gameUpdate && gameUpdate.game_id) {
      setGames(games.map((g) => (Number(g.game_id) === Number(game_id) ? gameUpdate : g)));
    }
  };

  const voteForRecreate = async (game_id, vote) => {
    const url = `/games/user/recreate/vote/${game_id}`;
    const gameUpdate = await axios.post(url, { vote });
    updateGame(game_id, gameUpdate);
  };

  const updateGame = (game_id, newData) => {
    setGames(
      games.map((g) => {
        const isUpdatingGame = g.game_id === game_id;
        const updatedGame = isUpdatingGame && mergeObjects(g, newData);
        if (isUpdatingGame) {
          if (!g.isUsersTurn && updatedGame.isUsersTurn) {
            new Notification(`It is now your turn in ${updatedGame.name}`);
          }
        }

        return isUpdatingGame ? updatedGame : g;
      })
    );
  };

  const fetchGame = async (game_id) => {
    if (!gamesLookup[game_id]?.scores) {
      const game = await axios.get(`/games/user/fetch/${game_id}`);
      if (game && game.game_id) {
        setGames([...games, game]);
      } else if (game !== false && history.location.pathname.includes(`game/play/${game_id}`)) {
        history.push("/");
      }
    }
  };

  const reactToLog = async (log_id, reaction) => {
    const url = `/games/logs/react/${log_id}`;
    const logs = await axios.post(url, { reaction });

    if (logs) {
      setGames(
        games.map((g) => (Number(g.game_id) === Number(logs[0].game_id) ? { ...g, logs } : g))
      );
    }
  };

  const value = {
    games,
    gamesLookup,
    setGames,
    gamesAreLoading,
    getUsersGames,
    addGame,
    leaveGame,
    rollTheDice,
    submitScore,
    updateGame,
    fetchGame,
    voteForRecreate,
    reactToLog,
    activeGameIds: games.reduce(reduceGamesToActiveIds, []),
  };

  return <Provider value={value}>{props.children}</Provider>;
}

export default function useGames() {
  return useContext(context);
}

const urls = {
  create: "/games/user/create",
  join: "/games/user/join",
};

const getGamesLookup = (function (cache) {
  return function (games) {
    if (games && cache.games !== games) {
      cache.games = games;
      cache.results = games.reduce((lookup, game) => {
        lookup[game.game_id] = game;
        return lookup;
      }, {});
    }

    return cache.results;
  };
})({});

function reduceGamesToActiveIds(acc, { game_id, isActive }) {
  if (isActive) {
    acc.push(game_id);
  }

  return acc;
}
