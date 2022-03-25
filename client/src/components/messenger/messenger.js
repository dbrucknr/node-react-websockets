import { useSelector } from "react-redux";
import { Navbar } from "./components/navbar";
import "./messenger.scss";

export const Messenger = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <h1>Messenger Screen</h1>
        <p>Dummy data</p>
      </div>
    </div>
  );
};
