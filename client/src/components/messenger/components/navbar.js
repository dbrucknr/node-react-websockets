import "./navbar.scss";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { logout } from "../../../store/actions/auth";
import { Modal } from "../../modal/modal";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = useSelector((state) => state.authReducer.user);

  const [showOptions, setShowOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(true);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { firstName, lastName, email, gender, password, avatar };
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // Dispatch
  };
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
            <p onClick={() => setShowProfileModal(true)}>Update Profile</p>
            <p onClick={() => dispatch(logout())}>Logout</p>
          </div>
        )}
        {showProfileModal && (
          <Modal click={() => setShowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update Profile</h3>
            </Fragment>
            <Fragment key="body">
              <form>
                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required="required"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required="required"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required="required"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="input-field mb-1">
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    required="required"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required="required"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setAvatar(e.target.files[0])}
                    type="file"
                  />
                </div>
              </form>
            </Fragment>
            <Fragment key="footer">
              <button className="btn-success">Update</button>
            </Fragment>
          </Modal>
        )}
      </div>
    </div>
  );
};
