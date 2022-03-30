import "./MessageHeader.scss";
import { Fragment, useState } from "react";
import { userStatus } from "../../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MessageHeader = ({ thread }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveThreadModal, setShowLeaveThreadModal] = useState(false);
  const [showDeleteThreadModal, setShowDeleteThreadModal] = useState(false);

  return (
    <Fragment>
      <div id="chatter">
        {thread.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        icon={["fas", "ellipsis-v"]}
        className="fa-icon"
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions ? (
        <div id="settings">
          <div>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add User to Thread</p>
          </div>
          {thread.type === "group" ? (
            <div>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave Thread</p>
            </div>
          ) : null}
          <div>
            <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
            <p>Delete Thread</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};
