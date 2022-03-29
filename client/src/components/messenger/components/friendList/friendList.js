import "./FriendList.scss";
import { useSelector, useDispatch } from "react-redux";
import { Friend } from "../friend/friend";

export const FriendList = () => {
  const threads = useSelector((state) => state.messengerReducer.threads);
  return (
    <div id="friends">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button>Add</button>
      </div>
      <hr />
      <div id="friends-box">
        {threads.length > 0 ? (
          threads.map((thread) => {
            return <Friend thread={thread} key={thread.id} />;
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
    </div>
  );
};
