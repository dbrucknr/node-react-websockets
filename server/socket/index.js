const socketIo = require("socket.io");

const users = new Map();

const SocketServer = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      let sockets = [];

      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[socket.id]];
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
        sockets.push(socket.id);
      }
      const onlineFriends = []; // ids
      const chatters = []; // query

      // Notify friends that user is online.
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i].id);
          chatters.sockets.forEach((socket) => {
            try {
              io.to(socket).emit("online", user);
            } catch (error) {
              console.error("Error notifying friends user came online", error);
            }
            onlineFriends.push(chatter.id);
          });
        }
      }
      // Send to user sockets which friends are online
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("friends", onlineFriends);
        } catch (error) {
          console.error("Error notifying user which friends are online", error);
        }
      });
      io.to(socket.id).emit("typing", "User typing...");
    });
  });
};

module.exports = SocketServer;
