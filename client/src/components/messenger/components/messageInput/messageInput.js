import "./MessageInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

export const MessageInput = ({ thread }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.messengerReducer.socket);

  const handleMessage = (event) => {
    const value = event.target.value;
    setMessage(value);

    // Notify others that this user is typing
  };

  const handleKeyDown = (event, imageUpload) => {
    if (event.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) {
      return;
    }
    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      receiverId: thread.Users.map((user) => user.id),
      threadId: thread.id,
      message: imageUpload ? image : message,
    };

    // Send Message with Socket
    socket.emit("message", msg);
    setMessage("");
    setImage("");
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          placeholder="Enter a Message"
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
          value={message || ""}
        />
        <FontAwesomeIcon icon={["far", "smile"]} className="fa-icon" />
      </div>
    </div>
  );
};
