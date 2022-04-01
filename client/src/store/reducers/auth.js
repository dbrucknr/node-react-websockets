const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || "",
  isLoggedIn: !!localStorage.getItem("user"),
};

const authActionMap = {
  LOGIN: (state, payload) => ({
    ...state,
    user: payload.user,
    token: payload.token,
    isLoggedIn: true,
  }),
  LOGOUT: (state) => ({
    ...state,
    user: {},
    token: "",
    isLoggedIn: false,
  }),
  REGISTER: (state, payload) => ({
    ...state,
    user: payload.user,
    token: payload.token,
    isLoggedIn: true,
  }),
  UPDATE_PROFILE: (state, payload) => ({
    ...state,
    user: payload,
  }),
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const handler = authActionMap[type];
  return handler ? handler(state, payload) : state;
};
