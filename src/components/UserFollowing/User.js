import React, { useState } from "react";
import "./css/User.css";
import Modal from "../../components/global/Modal";

import { followUser, unfollowUser } from "../../actions";
import { connect } from "react-redux";

const User = ({
  userData: { userId, username, profileUrl },
  followUser,
  unfollowUser,
}) => {
  const [IsFollowing, setFollowing] = useState(true);

  const [ShowUnfollowModal, setShowUnfollowModal] = useState(false);

  const handleUserFollow = () => {
    if (!IsFollowing) {
      setFollowing(true);
      followUser(userId);
    } else {
      setShowUnfollowModal(true);
    }
  };

  const handleCancelClick = () => {
    setShowUnfollowModal(false);
  };

  const handleConfirmClick = () => {
    setShowUnfollowModal(false);
    setFollowing(false);
    unfollowUser(userId);
  };

  return (
    <div className="user">
      <div className="user__info">
        <img
          src={
            profileUrl
              ? profileUrl
              : "https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
          }
          alt={`${username} avatar`}
        />
        <span className="info__name">{username}</span>
      </div>

      <button
        onClick={() => {
          handleUserFollow();
        }}
        className="button"
      >
        {IsFollowing ? "Following" : "Follow"}
      </button>

      {ShowUnfollowModal ? (
        <Modal
          isUnFollowModal
          Username={username}
          onConfirmClick={handleConfirmClick}
          onCancelClick={handleCancelClick}
        />
      ) : null}
    </div>
  );
};

export default connect(null, {
  followUser,
  unfollowUser,
})(User);
