import { useEffect } from "react";
import socketIOClient from "socket.io-client";

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
  }, [user, dispatch]);
}

export default useSocket;
