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
      <div className="user-unfollow-modal">
        <div
          onClick={() => {
            onCancelClick();
          }}
          className="unfollow-overlay"
        ></div>

        <div
          onClick={(event) => event.stopPropagation()}
          className="unfollow-modal-content"
        >
          {isUnFollowModal ? (
            <>
              <img
                className="user-avatar"
                src="https://www.instaclone.net/static/media/default-avatar.522560c8.png"
                alt="Avatar"
              />
              <p className="unfollow-text">{`Unfollow @${Username}?`}</p>
            </>
          ) : null}

          {isLogoutModal ? (
            <p className="unfollow-text">Logout of Instagram ?</p>
          ) : null}

          <button onClick={onConfirmClick} className="confirm">
            {isUnFollowModal ? "Unfollow" : "Logout"}
          </button>
          <button
            onClick={() => {
              console.log("cancel");
              onCancelClick();
            }}
            className="cancel"
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
