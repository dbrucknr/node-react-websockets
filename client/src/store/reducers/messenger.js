import { RETRIEVE_THREADS } from "../actions/messenger";

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
    default: {
      return state;
    }
  }
};
