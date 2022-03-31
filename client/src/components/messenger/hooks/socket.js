import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { onlineFriends } from "../../../store/actions/messenger";

function useSocket(user, dispatch) {
  useEffect(() => {
    const socket = socketIOClient.connect("http://localhost:8000/", {
      transports: ["websocket"],
      withCredentials: true,
      upgrade: false,
    });

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
    });

    socket.on("offline", (user) => {
      console.log("Offline event", user);
    });
  }, [user, dispatch]);
}

export default useSocket;
