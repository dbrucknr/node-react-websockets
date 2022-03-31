import {
  RETRIEVE_THREADS,
  SET_CURRENT_THREAD,
  FRIENDS_ONLINE,
  FRIEND_ONLINE,
  FRIEND_OFFLINE,
  SET_SOCKET,
  RECEIVED_MESSAGE,
} from "../actions/messenger";

const initialState = {
  threads: [],
  currentThread: {},
  socket: {},
  newMessage: { threadId: null, seen: null },
  scrollBottom: 0,
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
    case SET_SOCKET: {
      return {
        ...state,
        socket: payload,
      };
    }
    case RECEIVED_MESSAGE: {
      const { message, userId } = payload;
      let currentThreadCopy = { ...state.currentThread };
      let newMessage = { ...state.newMessage };
      let scrollBottom = state.scrollBottom;

      const threadsCopy = state.threads.map((thread) => {
        if (message.threadId === thread.id) {
          // If we are the user that sent the message, scroll to bottom
          if (message.User.id === userId) {
            scrollBottom++;
          } else {
            newMessage = {
              threadId: thread.id,
              seen: false,
            };
          }

          if (message.threadId === currentThreadCopy.id) {
            currentThreadCopy = {
              ...currentThreadCopy,
              Messages: [...currentThreadCopy.Messages, ...[message]],
            };
          }

          return {
            ...thread,
            Messages: [...thread.Messages, ...[message]],
          };
        }
        return thread;
      });

      if (scrollBottom === state.scrollBottom) {
        return {
          ...state,
          threads: threadsCopy,
          currentThread: currentThreadCopy,
          newMessage,
        };
      }
      return {
        ...state,
        threads: threadsCopy,
        currentThread: currentThreadCopy,
        newMessage,
        scrollBottom,
      };
    }
    default: {
      return state;
    }
  }
};
