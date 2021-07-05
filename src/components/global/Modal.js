import React from "react";
import ReactDOM from "react-dom";
import "../css/global/Modal.css";

const ModalMount = document.getElementById("fileUpload-wrapper");

const Modal = ({
  onConfirmClick,
  onCancelClick,
  Username,
  isUnFollowModal,
  isLogoutModal,
}) => {
  const renderModal = () => {
    return (
      <div class="user-unfollow-modal">
        <div
          onClick={() => {
            onCancelClick();
          }}
          class="unfollow-overlay"
        ></div>

        <div
          onClick={(event) => event.stopPropagation()}
          class="unfollow-modal-content"
        >
          {isUnFollowModal ? (
            <>
              <img
                class="user-avatar"
                src="https://www.instaclone.net/static/media/default-avatar.522560c8.png"
                alt="Avatar"
              />
              <p class="unfollow-text">{`Unfollow @${Username}?`}</p>
            </>
          ) : null}

          {isLogoutModal ? (
            <p class="unfollow-text">Logout of Instagram ?</p>
          ) : null}

          <button onClick={onConfirmClick} class="confirm">
            {isUnFollowModal ? "Unfollow" : "Logout"}
          </button>
          <button
            onClick={() => {
              console.log("cancel");
              onCancelClick();
            }}
            class="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(renderModal(), ModalMount);
};

export default Modal;
