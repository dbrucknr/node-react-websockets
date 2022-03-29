import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "./components/navbar";
import { retrieveThreads } from "../../store/actions/messenger";
import "./messenger.scss";

export const Messenger = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(retrieveThreads());
  }, [dispatch]);

  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <h1>Messenger Screen</h1>
        <p>Dummy data</p>
        <img src={user.avatar} alt="Avatar" />
      </div>
    </div>
  );
};
