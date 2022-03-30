import { Message } from "../message/message";
import { useSelector } from "react-redux";
import "./MessageBox.scss";

export const MessageBox = ({ thread }) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="msg-box">
      {thread.Messages.map((message, index) => {
        return (
          <Message
            key={message.id}
            thread={thread}
            message={message}
            index={index}
            user={user}
          />
        );
      })}
    </div>
  );
};
