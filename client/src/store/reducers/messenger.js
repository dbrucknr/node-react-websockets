import { RETRIEVE_THREADS, SET_CURRENT_THREAD } from "../actions/messenger";

const initialState = {
  threads: [],
  currentThread: {},
};

export const messengerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_THREADS:
      return {
        ...state,
        threads: payload,
      };
    case SET_CURRENT_THREAD:
      return {
        ...state,
        currentThread: payload,
      };
    default: {
      return state;
    }
  }
};
