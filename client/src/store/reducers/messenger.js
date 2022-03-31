import {
  RETRIEVE_THREADS,
  SET_CURRENT_THREAD,
  FRIENDS_ONLINE,
  FRIEND_ONLINE,
  FRIEND_OFFLINE,
} from "../actions/messenger";

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
    case FRIENDS_ONLINE: {
      console.log("FRIENDS_ONLINE");
      const threadsCopy = state.threads.map((thread) => {
        return {
          ...thread,
          Users: thread.Users.map((user) => {
            if (payload.includes(user.id)) {
              return {
                ...user,
                status: "online",
              };
            }
            return user;
          }),
        };
      });
      return {
        ...state,
        threads: threadsCopy,
      };
    }
    case FRIEND_ONLINE: {
      let currentThreadCopy = { ...state.currentThread };
      const threadsCopy = state.threads.map((thread) => {
        const Users = thread.Users.map((user) => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: "online",
            };
          }
          return user;
        });
        if (thread.id === currentThreadCopy.id) {
          currentThreadCopy = {
            ...currentThreadCopy,
            Users,
          };
        }
        return {
          ...thread,
          Users,
        };
      });
      return {
        ...state,
        threads: threadsCopy,
        currentThread: currentThreadCopy,
      };
    }
    case FRIEND_OFFLINE: {
      let currentThreadCopy = { ...state.currentThread };
      const threadsCopy = state.threads.map((thread) => {
        const Users = thread.Users.map((user) => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: "offline",
            };
          }
          return user;
        });
        if (thread.id === currentThreadCopy.id) {
          currentThreadCopy = {
            ...currentThreadCopy,
            Users,
          };
        }
        return {
          ...thread,
          Users,
        };
      });
      return {
        ...state,
        threads: threadsCopy,
        currentThread: currentThreadCopy,
      };
    }
    default: {
      return state;
    }
  }
};
