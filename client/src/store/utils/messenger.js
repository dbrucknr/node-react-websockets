export const messengerActionMapHelpers = () => {
  const friendsOnline = (state, payload) => {
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
  };

  const friendOnlineOffline = (state, payload, desiredStatus) => {
    let currentThreadCopy = { ...state.currentThread };
    const threadsCopy = state.threads.map((thread) => {
      const Users = thread.Users.map((user) => {
        if (user.id === parseInt(payload.id)) {
          return {
            ...user,
            status: desiredStatus,
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
  };

  const receivedMessage = (state, payload) => {
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
  };

  return { friendsOnline, friendOnlineOffline, receivedMessage };
};
