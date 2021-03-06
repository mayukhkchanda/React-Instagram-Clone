import React, { useState } from "react";
import "./css/ProfileHeader.css";
import Modal from "../global/Modal";
import FileUploadModal from "../SignedInHomepage/FileUploadModal";

import { authenticator } from "../../firebase";

import { Link } from "react-router-dom";

import { updateUserInfo } from "../../actions";
import { connect } from "react-redux";

const ProfileHeader = ({
  User: { userId, username, following, profileUrl },
  numPosts,
  numFollowers,
  updateUserInfo,
}) => {
  const [ShowLogoutModal, setShowLogoutModal] = useState(false);

  const [ShowFileUploadModal, setShowFileUploadModal] = useState(false);

  const handleConfirmClick = () => {
    setShowLogoutModal(false);

    authenticator.signOut();
  };

  const handleCancelClick = () => {
    setShowLogoutModal(false);
  };

  /**callback called after image is uploaded sucessfully */
  const onUploadSuccess = ({ downloadURL }) => {
    /**call upload user info action creator here. Need the feild being update and its new value */
    updateUserInfo({ feildToUpdate: "profileUrl", newValue: downloadURL });
  };

  return (
    <div className="profile__header">
      <div className="header__avatar">
        <img
          onClick={() => {
            setShowFileUploadModal(true);
          }}
          src={
            profileUrl
              ? profileUrl
              : `${process.env.PUBLIC_URL}/assets/images/default_avatar.png`
          }
          alt="user-avatar"
        />
      </div>

      <div className="header__details">
        <div className="header__userinfo">
          <h3>{username}</h3>
          <button
            onClick={() => {
              setShowLogoutModal(true);
            }}
          >
            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
              <path
                clipRule="evenodd"
                d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="header__activity">
          <span className="activity__posts">{`${numPosts} `} posts</span>
          <Link to={`/${userId}/followers`}>
            <span className="activity__followers">
              {`${numFollowers > 0 ? numFollowers - 1 : 0} `} followers
            </span>
          </Link>
          <Link to={`/${userId}/following`}>
            <span className="activity__following">
              {following.length > 0 ? following.length - 1 : "0 "} following
            </span>
          </Link>
        </div>
      </div>

      {ShowLogoutModal ? (
        <Modal
          onConfirmClick={handleConfirmClick}
          onCancelClick={handleCancelClick}
          isLogoutModal
        />
      ) : null}

      {ShowFileUploadModal ? (
        <FileUploadModal
          setModalShow={setShowFileUploadModal}
          onUploadSuccess={onUploadSuccess}
        />
      ) : null}
    </div>
  );
};

export default connect(null, {
  updateUserInfo,
})(ProfileHeader);
