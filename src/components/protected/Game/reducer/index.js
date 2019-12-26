import { isUsersTurn } from 'js/rounds.js';

const initialLinkText = 'Generating link...';

export const initialState = {
  locked: [false, false, false, false, false],
  game: {},
  selected: null,
  isTurn: false,
  showPrompt: false,
  link: initialLinkText,
  viewing: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_IS_TURN':
      return {
        ...state,
        isTurn: isUsersTurn(state.game.scores, action.payload)
      };
    case 'UPDATE_GAME':
      return {
        ...state,
        game: action.payload
      };
    case 'UPDATE_LINK':
      return { ...state, link: action.payload };
    case 'DISABLE_PROMPT':
      return { ...state, showPrompt: false };
    case 'ENABLE_PROMPT':
      return { ...state, showPrompt: true };
    case 'PROMPT_OFF':
      return { ...state, link: initialLinkText, showPrompt: false };
    case 'LOCK_DIE':
      return {
        ...state,
        locked: state.locked.map((l, i) =>
          i === parseInt(action.payload, 10) ? true : l
        )
      };
    case 'ROUND_RESET':
      return {
        ...state,
        selected: null,
        locked: [false, false, false, false, false]
      };
    case 'TOGGLE_SELECTED':
      return {
        ...state,
        selected:
          parseInt(action.payload, 10) === state.selected
            ? null
            : parseInt(action.payload, 10)
      };
    default:
      return { ...state };
  }
};
