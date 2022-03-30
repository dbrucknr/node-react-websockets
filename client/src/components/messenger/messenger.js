import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "./components/navbar";
import { retrieveThreads } from "../../store/actions/messenger";
import { FriendList } from "./components/friendList/friendList";
import { MessageComposer } from "./components/messageComposer/messageComposer";
import "./messenger.scss";

export const Messenger = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(retrieveThreads());
  }, [dispatch]);

  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <MessageComposer />
      </div>
    </div>
  );
};
