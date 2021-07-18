import React, { useState } from "react";
import "./css/User.css";

import { connect } from "react-redux";
import { removeFollower } from "../../actions";

const User = ({
  userData: { username, userId, profileUrl },
  removeFollower,
}) => {
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
          src={
            profileUrl
              ? profileUrl
              : `${process.env.PUBLIC_URL}/assets/images/default_avatar.png`
          }
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
