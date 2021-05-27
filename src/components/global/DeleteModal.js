import React from "react";
import ReactDOM from "react-dom";
import history from "../../history";
import "../css/global/DeleteModal.css";

function DeleteModal({ onBackgroundClick, handleConfirmDelete }) {
  const renderModal = () => {
    return (
      <div onClick={onBackgroundClick} className="DeletePost">
        <div className="overlay"></div>
        <div
          onClick={(event) => event.stopPropagation()}
          className="DeletePost--modal"
        >
          <i onClick={() => history.push("/")} className="fa fa-times" />
          <h3 className="modalHeader">
            Are you sure you want to delete this post?
          </h3>

          {/* <div className="progress--div">
        <div className="progres--bar" style=" width: 32% "></div>
        </div> */}
          <div className="DeletPost--buttonWrapper">
            <button
              onClick={handleConfirmDelete}
              className="DeletePost__button Delete"
            >
              Confirm
            </button>
            <button
              onClick={() => history.push("/")}
              className="DeletePost__button Cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    renderModal(),
    document.getElementById("fileUpload-wrapper")
  );
}

export default DeleteModal;
