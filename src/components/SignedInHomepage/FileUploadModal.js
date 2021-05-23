import React from "react";
import ReactDOM from "react-dom";
import "../css/SignedInHomepage/FileUploadModal.css";

function FileUploadModal({ setModalShow }) {
  const renderModal = () => {
    return (
      <div className="modal" onClick={() => setModalShow(false)}>
        <div className="overlay"></div>
        <div onClick={(e) => e.stopPropagation()} className="createPost--modal">
          <i class="fa fa-times" onClick={() => setModalShow(false)}></i>
          <input
            className="createPost--modal__input"
            type="text"
            placeholder="Enter a Caption"
          />

          <div className="file__upload--div">
            <label className="file__upload--fake" for="upload-photo">
              <span className="text"> Select an Image </span>
              <span className="button"> Browse </span>
            </label>
            <input
              className="file__upload"
              type="file"
              id="upload-photo"
              name="image_file"
            />
          </div>

          <div className="progress--div">
            <div className="progres--bar"></div>
          </div>
          <button class="upload__button">Upload</button>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    renderModal(),
    document.getElementById("fileUpload-wrapper")
  );
}

export default FileUploadModal;
