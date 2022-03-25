import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { logout } from "../../../store/actions/auth";

export const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  return (
    <div id="navbar" className="card-shadow">
      <h2>Messenger</h2>
      <div id="profile-menu" onClick={() => setShowOptions(!showOptions)}>
        <img width="40" height="40" src={user.avatar} alt="avatar" />
        <p>
          {user.firstName} {user.lastName}
          <FontAwesomeIcon icon="caret-down" className="fa-icon" />
        </p>
        {showOptions && (
          <div id="profile-options">
            <p>Update Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};