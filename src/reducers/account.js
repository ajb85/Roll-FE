import axios from "axios";

const initialState = {
  id: null,
  username: "",
  email: "",
  wins: 0,
  losses: 0,
  token: localStorage.getItem("token"),
};

const SET_TOKEN = "SET_TOKEN";
const SET_ACCOUNT_INFO = "SET_ACCOUNT_INFO";

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return action.payload
        ? { ...state, token: action.payload }
        : initialState;
    }
    case SET_ACCOUNT_INFO: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

export const authAccount = (form) => async (dispatch) => {
  const accountInfo = await axios.post("/auth", form);
  if (accountInfo) {
    dispatch({ type: SET_ACCOUNT_INFO, payload: accountInfo.data });
  }
};

export const setToken = (payload) => {
  payload
    ? localStorage.setItem("token", payload)
    : localStorage.removeItem("token");
  return { type: SET_TOKEN, payload };
};

export const logout = () => (dispatch) => {
  dispatch(setToken());
};

export const populateAccount = () => (dispatch) => {
  axios.get("/auth").then((res) => {
    res &&
      dispatch({ type: SET_ACCOUNT_INFO, payload: res ? res.data : undefined });
  });
};
