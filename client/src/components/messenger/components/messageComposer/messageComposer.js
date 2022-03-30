import "./messageComposer.scss";
import { useSelector } from "react-redux";
import { MessageHeader } from "../messageHeader/messageHeader";
import { MessageBox } from "../messageBox/messageBox";
import { MessageInput } from "../messageInput/messageInput";

export const MessageComposer = () => {
  const thread = useSelector((state) => state.messengerReducer.currentThread);
  const activeThread = () => {
    return Object.keys(thread).length > 0;
  };
  return (
    <div id="messenger" className="shadow-light">
      {activeThread() ? (
        <div id="messenger-wrap">
          <MessageHeader thread={thread} />
          <hr />
          <MessageBox thread={thread} />
          <MessageInput thread={thread} />
        </div>
      ) : (
        <p>No Active Thread</p>
      )}
    </div>
  );
};
