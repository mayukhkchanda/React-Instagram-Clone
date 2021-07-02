import React, { useState } from "react";
import "./css/User.css";

import { connect } from "react-redux";
import { removeFollower } from "../../actions";

const User = ({ userData: { username, userId }, removeFollower }) => {
  const [IsRemoved, setIsRemoved] = useState(false);

  const handleButtonClick = () => {
    if (!IsRemoved) {
      // once following is removed, set removed to be true
      setIsRemoved(true);

      // call the action creator to remove this signed-in user's id from
      // this user's id
      removeFollower(userId);
    }
  };

  return (
    <div className="user">
      <div className="user__info">
        <img
          src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
          alt={`${username} avatar`}
        />
        <span className="info__name">{username}</span>
      </div>

      <button
        disabled={IsRemoved}
        onClick={() => {
          handleButtonClick();
        }}
        className="button"
      >
        {!IsRemoved ? "Remove" : "Removed"}
      </button>
    </div>
  );
};

export default connect(null, {
  removeFollower,
})(User);
