import React from "react";
import ReactDOM from "react-dom";
import "../css/global/UnfollowModal.css";

const ModalMount = document.getElementById("fileUpload-wrapper");

const UnfollowModal = ({ onConfirmClick, onCancelClick, Username }) => {
  const renderModal = () => {
    return (
      <div class="user-unfollow-modal">
        <div class="unfollow-overlay"></div>

        <div class="unfollow-modal-content">
          <img
            class="user-avatar"
            src="https://www.instaclone.net/static/media/default-avatar.522560c8.png"
            alt="Avatar"
          />

          <p class="unfollow-text">{`Unfollow @${Username}?`}</p>
          <button onClick={onConfirmClick} class="confirm">
            Unfollow
          </button>
          <button onClick={onCancelClick} class="cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(renderModal(), ModalMount);
};

export default UnfollowModal;
