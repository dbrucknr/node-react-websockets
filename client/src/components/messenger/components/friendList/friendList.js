import "./FriendList.scss";
import { useSelector, useDispatch } from "react-redux";
import { Friend } from "../friend/friend";
import { setCurrentThread } from "../../../../store/actions/messenger";

export const FriendList = () => {
  const threads = useSelector((state) => state.messengerReducer.threads);
  console.log("FriendList", threads);
  const dispatch = useDispatch();
  const openThread = (thread) => dispatch(setCurrentThread(thread));

  return (
    <div id="friends" className="shadow-light">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button>Add</button>
      </div>
      <hr />
      <div id="friends-box">
        {threads.length > 0 ? (
          threads.map((thread) => {
            return (
              <Friend
                click={() => openThread(thread)}
                thread={thread}
                key={thread.id}
              />
            );
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
    </div>
  );
};
