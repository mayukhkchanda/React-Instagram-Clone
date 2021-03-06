import React, { useEffect, useState } from "react";
import "../css/global/MobileFooter.css";
import FileUploadModal from "../SignedInHomepage/FileUploadModal";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { createPost } from "../../actions";

const MobileFooter = ({ User, createPost, setModalShowing }) => {
  const [ShowUploadModal, setShowUploadModal] = useState(false);

  /**Notify parent component whenever modal's state changes */
  useEffect(() => {
    setModalShowing(ShowUploadModal);
  }, [ShowUploadModal]);

  /**callback called after image is uploaded sucessfully */
  const onUploadSuccess = ({ Caption, downloadURL }) => {
    createPost({ caption: Caption, imageUrl: downloadURL });
  };

  const renderContent = () => {
    return (
      <div className="footer">
        <div className="footer__nav">
          <Link to="/" className="footer__nav__icon home">
            <svg viewBox="0 0 576 512" width="100" title="home">
              <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
            </svg>
          </Link>
          <span
            onClick={() => {
              setShowUploadModal(true);
            }}
            className="footer__nav__icon upload"
          >
            <svg viewBox="0 0 512 512" width="100" title="plus-circle">
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
            </svg>
          </span>
          <Link to="/user/profile" className="footer__nav__icon profile">
            {User?.profileUrl ? (
              <img src={User?.profileUrl} alt={`${User?.username} avatar`} />
            ) : (
              <svg viewBox="0 0 496 512" width="100" title="user-circle">
                <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
              </svg>
            )}
          </Link>
        </div>
        {ShowUploadModal ? (
          <FileUploadModal
            setModalShow={setShowUploadModal}
            onUploadSuccess={onUploadSuccess}
            captionNeeded
          />
        ) : null}
      </div>
    );
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return { User: state.user };
};

export default connect(mapStateToProps, {
  createPost,
})(MobileFooter);
