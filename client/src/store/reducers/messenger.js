import { messengerActionMapHelpers } from "../utils/messenger";

const { friendsOnline, friendOnlineOffline, receivedMessage } =
  messengerActionMapHelpers();

const initialState = {
  threads: [],
  currentThread: {},
  socket: {},
  newMessage: { threadId: null, seen: null },
  scrollBottom: 0,
};

const messengerActionMap = {
  RETRIEVE_THREADS: (state, payload) => ({ ...state, threads: payload }),
  SET_CURRENT_THREAD: (state, payload) => ({
    ...state,
    currentThread: payload,
    scrollBottom: state.scrollBottom + 1,
    newMessage: { threadId: null, seen: null },
  }),
  FRIENDS_ONLINE: (state, payload) => ({
    ...friendsOnline(state, payload),
  }),
  FRIEND_ONLINE: (state, payload) => ({
    ...friendOnlineOffline(state, payload, "online"),
  }),
  FRIEND_OFFLINE: (state, payload) => ({
    ...friendOnlineOffline(state, payload, "offline"),
  }),
  SET_SOCKET: (state, payload) => ({ ...state, socket: payload }),
  RECEIVED_MESSAGE: (state, payload) => ({
    ...receivedMessage(state, payload),
  }),
};

export const messengerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(state.scrollBottom);
  console.log(state.currentThread);
  const handler = messengerActionMap[type];
  return handler ? handler(state, payload) : state;
};
