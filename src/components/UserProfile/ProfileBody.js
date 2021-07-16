import React, { useState } from "react";
import "./css/ProfileBody.css";
import ProfilePhoto from "../../components/UserProfile/ProfilePhoto";

import FileUploadModal from "../SignedInHomepage/FileUploadModal";

import { Link } from "react-router-dom";
import { createPost } from "../../actions";
import { connect } from "react-redux";

const ProfileBody = ({
  User: { userId, following },
  UserPosts,
  createPost,
  numFollowers,
  numPosts,
}) => {
  const [ShowModal, setShowModal] = useState(false);

  /**callback called after image is uploaded sucessfully */
  const onUploadSuccess = ({ Caption, downloadURL }) => {
    createPost({ caption: Caption, imageUrl: downloadURL });
  };

  const renderBodyContent = () => {
    if (!UserPosts || UserPosts?.length <= 0) {
      return (
        <div className="body__content">
          <div className="body__icon">
            <svg viewBox="0 0 512 512" width="100" title="camera">
              <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
            </svg>
          </div>
          <p className="body__text--1">Share Photos</p>
          <p className="body__text--2">
            When you share photos, they will appear on your profile.
          </p>
          <p onClick={() => setShowModal(true)} className="body__callToAction">
            Share your first photo
          </p>

          {ShowModal ? (
            <FileUploadModal
              setModalShow={setShowModal}
              onUploadSuccess={onUploadSuccess}
              captionNeeded
            />
          ) : null}
        </div>
      );
    }

    const renderedPhotos = UserPosts.map((post) => {
      return (
        <ProfilePhoto key={post.id} postData={post.data} postId={post.id} />
      );
    });

    return <div className="profile__photos"> {renderedPhotos} </div>;
  };

  return (
    <div className="profile__body">
      <div className="header__activity--body">
        <div className="activity--body">
          <span className="number">{`${numPosts}`}</span>
          <span className="type">posts</span>
        </div>
        <Link className="activity--body" to={`/${userId}/followers`}>
          <span className="number">{`${
            numFollowers > 0 ? numFollowers - 1 : 0
          }`}</span>
          <span className="type">followers</span>
        </Link>
        <Link className="activity--body" to={`/${userId}/following`}>
          <span className="number">
            {following.length > 0 ? following.length - 1 : "0"}
          </span>
          <span className="type">following</span>
        </Link>
      </div>
      <hr className="border-bottom" />
      <div className="profile__category">
        <div className="category--posts">
          <span className="category__icon">
            <svg
              aria-label="Posts"
              className="post__icon"
              fill="#262626"
              height="12"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clipRule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="category__text">POSTS</span>
        </div>
      </div>
      {renderBodyContent()}
    </div>
  );
};

export default connect(null, {
  createPost,
})(ProfileBody);
