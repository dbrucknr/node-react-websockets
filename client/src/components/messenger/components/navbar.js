import "./navbar.scss";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div id="navbar" className="card-shadow">
      <h2>Messenger</h2>
      <div id="profile-menu">
        <img src="" alt="avatar" />
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};
