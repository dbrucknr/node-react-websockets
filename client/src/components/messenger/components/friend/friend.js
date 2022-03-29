import "./Friend.scss";
import { useSelector } from "react-redux";
import { userStatus } from "../../../../utils/helpers";

export const Friend = ({ thread }) => {
  const currentThread = useSelector(
    (state) => state.messengerReducer.currentThread
  );
  const isThreadOpened = () => (currentThread.id === thread.id ? "opened" : "");
  const lastMessage = () => {
    if (thread.Messages.length === 0) {
      return "";
    }
    const message = thread.Messages[thread.Messages.length - 1];
    return message.type === "image" ? "Image Uploaded" : message.message;
  };
  return (
    <div className={`friend-list ${isThreadOpened()}`}>
      <div>
        <img width="40" height="40" src={thread.Users[0].avatar} alt="Avatar" />
        <div className="friend-info">
          <h4 className="m-0">
            {thread.Users[0].firstName} {thread.Users[0].lastName}
          </h4>
          <h5 className="m-0">{lastMessage()}</h5>
        </div>
      </div>
      <div className="friend-status">
        <span className={`online-status ${userStatus(thread.Users[0])}`}></span>
      </div>
    </div>
  );
};
