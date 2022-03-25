import "./navbar.scss";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div id="navbar" className="card-shadow">
      <h2>Messenger</h2>
      <div id="profile-menu">
        <img width="40" height="40" src={user.avatar} alt="avatar" />
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};
