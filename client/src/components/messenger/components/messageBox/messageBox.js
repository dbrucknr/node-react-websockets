import { Message } from "../message/message";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./MessageBox.scss";

export const MessageBox = ({ thread }) => {
  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector(
    (state) => state.messengerReducer.scrollBottom
  );
  const msgBox = useRef();

  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBox.current.scrollHeight);
    }, 100);
  }, [scrollBottom]);

  const scrollManual = (value) => (msgBox.current.scrollTop = value);
  return (
    <div id="msg-box" ref={msgBox}>
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
