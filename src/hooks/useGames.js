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
    if (newGame) {
      setGames([...games, newGame]);
      history.push(`/game/play/${newGame.game_id}`);
    }
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

    if (gameUpdate) {
      setGames(games.map((g) => (Number(g.game_id) === Number(game_id) ? gameUpdate : g)));
    }
  };

  const updateGame = (game_id, newData) =>
    setGames(games.map((g) => (g.game_id === game_id ? mergeObjects(g, newData) : g)));

  const fetchGame = async (game_id) => {
    if (!gamesLookup[game_id]?.scores) {
      const game = await axios.get(`/games/user/fetch/${game_id}`);
      if (game) {
        setGames([...games, game]);
      }
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