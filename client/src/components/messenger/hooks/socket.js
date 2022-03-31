import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  retrieveThreads,
  onlineFriends,
  onlineFriend,
  offlineFriend,
  setSocket,
  receivedMessage,
} from "../../../store/actions/messenger";

function useSocket(user, dispatch) {
  useEffect(() => {
    dispatch(retrieveThreads())
      .then((res) => {
        const socket = socketIOClient.connect("http://localhost:8000/", {
          transports: ["websocket"],
          withCredentials: true,
          upgrade: false,
        });

        dispatch(setSocket(socket));

        socket.emit("join", user);

        socket.on("typing", (user) => {
          console.log("Typing event", user);
        });

        socket.on("friends", (friends) => {
          console.log("friends", friends);
          dispatch(onlineFriends(friends));
        });

        socket.on("online", (user) => {
          console.log("Online event", user);
          dispatch(onlineFriend(user));
        });

        socket.on("offline", (user) => {
          console.log("Offline event", user);
          dispatch(offlineFriend(user));
        });

        socket.on("received", (message) => {
          dispatch(receivedMessage(message, user.id));
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, dispatch]);
}

export default useSocket;
