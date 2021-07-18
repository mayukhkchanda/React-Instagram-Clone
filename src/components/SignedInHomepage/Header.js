import React, { useEffect, useState } from "react";
import "../css/SignedInHomepage/Header.css";
import { Link } from "react-router-dom";

import FileUploadModal from "./FileUploadModal";

import { createPost } from "../../actions";
import { connect } from "react-redux";

function Header({
  setModalShowing,
  User: { profileUrl, username },
  createPost,
}) {
  const [ShowModal, setShowModal] = useState(false);

  /**callback called after image is uploaded sucessfully */
  const onUploadSuccess = ({ Caption, downloadURL }) => {
    createPost({ caption: Caption, imageUrl: downloadURL });
  };

  /**when modal state changes call setModalShowing */
  useEffect(() => {
    setModalShowing(ShowModal);
  }, [ShowModal]);

  const renderHeader = () => {
    return (
      <div className="header">
        <div className="header_image">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/instagram-logo.png`}
              alt="instagram-logo"
              className="header__image"
            />
          </Link>
        </div>

        <div className="header__nav">
          <span className="nav__icon profile">
            <Link to="/user/profile">
              {profileUrl ? (
                <img src={profileUrl} alt={`${username} avatar`} />
              ) : (
                <svg viewBox="0 0 496 512" width="100" title="user-circle">
                  <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
                </svg>
              )}
            </Link>
          </span>

          <span className="nav__icon upload">
            <svg
              onClick={() => {
                setShowModal(true);
              }}
              viewBox="0 0 512 512"
              width="100"
              title="camera"
            >
              <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
            </svg>
          </span>

          {ShowModal ? (
            <FileUploadModal
              setModalShow={setShowModal}
              onUploadSuccess={onUploadSuccess}
              captionNeeded
            />
          ) : null}
        </div>
      </div>
    );
  };
  return renderHeader();
}

const mapStateToProps = (state) => {
  return { User: state.user };
};

export default connect(mapStateToProps, {
  createPost,
})(Header);
