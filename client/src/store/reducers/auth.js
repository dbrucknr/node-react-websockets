import { LOGIN, REGISTER, LOGOUT } from "../actions/auth";

const initialState = {
  user: {},
  token: "",
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: "",
        isLoggedIn: false,
      };
    case REGISTER:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: true,
      };
    default: {
      return state;
    }
  }
};
