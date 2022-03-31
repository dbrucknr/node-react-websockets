const e = require("cors");
const socketIo = require("socket.io");
const { sequelize } = require("../models");

const users = new Map();
const userSockets = new Map();

const SocketServer = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("disconnect", async () => {
      if (userSockets.has(socket.id)) {
        const id = userSockets.get(socket.id);
        const user = users.get(id);
        if (user.sockets.length > 1) {
          user.sockets = user.sockets.filter((sock) => {
            if (sock !== socket.id) {
              return true;
            }
            userSockets.delete(sock);
            return false;
          });
          users.set(user.id, user);
        } else {
          // Notify friends user went offline
          const chatters = await getChatters(user.id);

          for (let i = 0; i < chatters.length; i++) {
            if (users.has(chatters[i])) {
              users.get(chatters[i]).sockets.forEach((socket) => {
                try {
                  io.to(socket).emit("offline", user);
                } catch (error) {
                  console.error(
                    "Error notifying friends user came offline",
                    error
                  );
                }
              });
            }
          }
          userSockets.delete(socket.id);
          users.delete(user.id);
        }
      }
    });
    socket.on("join", async (user) => {
      let sockets = [];

      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[socket.id]];
        userSockets.set(socket.id, user.id);
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
        sockets.push(socket.id);
        userSockets.set(socket.id, user.id);
      }
      const onlineFriends = []; // ids
      const chatters = await getChatters(user.id); // query

      // Notify friends that user is online.
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i]);
          chatter.sockets.forEach((socket) => {
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

const getChatters = async (userId) => {
  try {
    const [result, metaData] = await sequelize.query(`
      select "p"."userId" from "Participants" as p
      inner join (
        select "t"."id" from "Threads" as t
        where exists (
          select "u"."id" from "Users" as u
          inner join "Participants" on u.id = "Participants"."userId"
          where u.id = ${parseInt(userId)} and t.id = "Participants"."threadId"
        )
      ) as pjoin on pjoin.id = "p"."threadId"
      where "p"."userId" != ${parseInt(userId)}
      `);

    return result.length > 0 ? result.map((el) => el.userId) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = SocketServer;
