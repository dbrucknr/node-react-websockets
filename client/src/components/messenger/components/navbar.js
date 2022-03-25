import "./navbar.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div id="navbar" className="card-shadow">
      <h2>Messenger</h2>
      <div id="profile-menu">
        <img width="40" height="40" src={user.avatar} alt="avatar" />
        <p>
          {user.firstName} {user.lastName}
          <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        </p>
      </div>
    </div>
  );
};
