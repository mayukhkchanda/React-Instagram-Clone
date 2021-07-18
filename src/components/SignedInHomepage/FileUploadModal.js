import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../css/SignedInHomepage/FileUploadModal.css";
import { storage } from "../../firebase";

import { connect } from "react-redux";
/**
 * @captionNeeded if true show input for caption else not.
 * @onUploadSuccess callback for after successfull uploading of image. Sent the user data object as argument.
 *  If @captionNeeded is true only then will caption data be sent with user data.
 *  Argument passed to @onUploadSuccess is : {caption:...(if @captionNeeded is true), imageUrl: ...}
 *
 */
function FileUploadModal({ setModalShow, onUploadSuccess, captionNeeded }) {
  const [Caption, setCaption] = useState("");
  const [File, setFile] = useState(null);
  const [ProgressPercent, setProgressPercent] = useState(0);
  const [NoFileErr, setNoFileErr] = useState("");
  const [UploadDisable, setUploadDisable] = useState(false);

  useEffect(() => {
    if (ProgressPercent === 100) {
      setModalShow(false);
    }
  }, [ProgressPercent, setModalShow]);

  const metadata = {
    contentType: "image/jpeg",
  };

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setNoFileErr("");
    }
  };

  const handleFileUpload = (event) => {
    /**Handle blank file upload */

    if (File === null) {
      setNoFileErr("Select an image to upload");
      return;
    }
    //returns an object of which index-1 is the file extesion
    const extension = /^.+\.([^.]+)$/.exec(File?.name)[1];
    if (
      !(
        extension === "png" ||
        extension === "jpeg" ||
        extension === "jpg" ||
        extension === "gif" ||
        extension === "bmp"
      )
    ) {
      setNoFileErr("Select .png/.jgep/.gif extension file");
      return;
    }

    /**prevent double submit */
    setUploadDisable(true);

    const storageRef = storage.ref();

    const uploadTask = storageRef
      .child(`images/${File?.name}`)
      .put(File, metadata);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",

      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgressPercent(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        //Callback for unsuccesful uploads
        console.log(error);
      },
      () => {
        //Callback for successful uploads
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          //call onUploadSuccess method with download url and caption(if needed)
          const uploadData = { downloadURL: downloadURL };

          // if caption is also needed then add that to the object else not
          if (captionNeeded) {
            uploadData["Caption"] = Caption;
          }

          onUploadSuccess(uploadData);
        });
      }
    );
  };

  const renderError = (message) => {
    return <div className="no-file-selected">{message}</div>;
  };

  const renderModal = () => {
    return (
      <div className="modal" onClick={() => setModalShow(false)}>
        <div className="overlay"></div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`createPost--modal ${captionNeeded ? "" : "no-caption"}`}
        >
          <i className="fa fa-times" onClick={() => setModalShow(false)}></i>

          {captionNeeded ? (
            <input
              className="createPost--modal__input"
              type="text"
              placeholder="Enter a Caption"
              value={Caption}
              onChange={(event) => setCaption(event.target.value)}
            />
          ) : null}

          <div className="file__upload--div">
            <label className="file__upload--fake" htmlFor="upload-photo">
              <span className="text"> {File?.name || "Select an Image"}</span>
              <span className="button"> Browse </span>
            </label>
            <input
              className="file__upload"
              type="file"
              id="upload-photo"
              name="image_file"
              onChange={handleFileChange}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          {NoFileErr !== "" ? renderError(NoFileErr) : null}

          <div className="progress--div">
            <div
              className="progres--bar"
              style={{ width: `${ProgressPercent}%` }}
            ></div>
          </div>
          <button
            onClick={handleFileUpload}
            className="upload__button"
            disabled={UploadDisable}
          >
            Upload
          </button>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    renderModal(),
    document.getElementById("fileUpload-wrapper")
  );
}

export default connect(null, {})(FileUploadModal);
