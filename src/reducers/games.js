import axios from "axios";
import history from "history.js";
// import Sockets from "sockets/";

const initialState = {
  active: [],
  wereFetched: false,
};

const GETTING_GAMES = "GETTING_GAMES";
const GOT_GAMES = "GOT_GAMES";
const SET_GAMES = "SET_GAMES";
const NEW_GAME = "NEW_GAME";
const LEAVING_GAME = "LEAVING_GAME";
const NEW_ROLL = "NEW_ROLL";
const UPDATE_SCORE = "UPDATE_SCORE";
const UPDATE_GAME = "UPDATE_GAME";

export default function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_GAMES:
      return { ...state, wereFetched: false };
    case GOT_GAMES:
      return { ...state, wereFetched: true };
    case SET_GAMES:
      return { ...state, active: action.payload, wereFetched: true };
    case NEW_GAME:
      return {
        ...state,
        active: [...state.active, action.payload],
        wereFetched: true,
      };
    case LEAVING_GAME:
      return {
        ...state,
        active: state.active.filter(
          (g) => parseInt(g.game_id, 10) !== parseInt(action.payload, 10)
        ),
        wereFetched: true,
      };
    case NEW_ROLL:
      const { game_id, rolls } = action.payload;
      return {
        ...state,
        active: state.active.map((g) => {
          if (g.game_id === game_id) {
            return { ...g, rolls };
          }
          return g;
        }),
      };
    case UPDATE_SCORE:
      return {
        ...state,
        active: state.active.map((g) => {
          if (g.game_id === action.payload.game_id) {
            return action.payload;
          } else return g;
        }),
      };
    case UPDATE_GAME:
      return {
        ...state,
        active: state.active.map((g) => {
          if (g.game_id === action.payload.game_id) {
            if (action.payload.context) {
              g[action.payload.context] = action.payload.newData;
            } else {
              return { ...g, ...action.payload.newData };
            }
          }
          return g;
        }),
      };
    default:
      return state;
  }
};

export const gettingGames = () => {
  return { type: GETTING_GAMES };
};

export const gotGames = () => {
  return { type: GOT_GAMES };
};

export const getUsersGames = () => async (dispatch) => {
  dispatch({ type: GETTING_GAMES });
  const userGames = await axios.get("/games/user");
  if (userGames) {
    const { data: payload } = userGames;
    dispatch({ type: SET_GAMES, payload });
    // Sockets.joinList(payload.map(({ name }) => name));
  }
};

export const createNewGame = (form) => async (dispatch) => {
  dispatch({ type: GETTING_GAMES });
  const newGame = await axios.post("games/user/create", form);
  if (newGame) {
    const { data: payload } = newGame;
    dispatch({ type: NEW_GAME, payload });
    // Sockets.join(payload.name);
    history.push("/");
  }
};

export const joinGame = (form) => async (dispatch) => {
  dispatch({ type: GETTING_GAMES });
  const joined = await axios.post(`games/user/join`, form);
  if (joined) {
    const { data: payload } = joined;
    dispatch({ type: NEW_GAME, payload });
    // Sockets.join(payload.name);
    history.push(`/game/play/${payload.game_id}`);
  }
};

export const leaveGame = (game_id) => async (dispatch) => {
  dispatch({ type: GETTING_GAMES });

  const leaving = await axios.delete(`games/user/leave/${game_id}`);
  if (leaving && parseInt(leaving.status, 10) === 201) {
    dispatch({ type: LEAVING_GAME, payload: game_id });
  }
};

export const rollTheDice = (game_id, locked) => async (dispatch) => {
  const newRoll = await axios.post(`/games/play/${game_id}/rollDice`, {
    locked,
  });
  if (newRoll) {
    dispatch({ type: NEW_ROLL, payload: newRoll.data });
  }
};

export const submitScore = (game_id, category) => async (dispatch) => {
  const gameUpdate = await axios.post(`/games/play/${game_id}/submitRound`, {
    category,
  });

  if (gameUpdate) {
    dispatch({ type: UPDATE_SCORE, payload: gameUpdate.data });
  }
};

export const updateGame = (game_id, newData, context) => ({
  type: UPDATE_GAME,
  payload: { game_id, context, newData },
});

export const fetchGame = (game_id) => async (dispatch) => {
  const game = await axios.get(`/games/user/fetch/${game_id}`);

  if (game) {
    dispatch({ type: NEW_GAME, payload: game.data });
  }
};
