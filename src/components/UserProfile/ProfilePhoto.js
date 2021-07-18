import React from "react";
import "./css/ProfilePhoto.css";

import { Link } from "react-router-dom";

const ProfilePhoto = ({ postData, postId }) => {
  return (
    <Link to={`/show/view/${postId}`} className="profile__photo">
      <div className="profile__photo--overlay" />
      <div className="icons__contianer">
        <svg
          viewBox="0 0 512 512"
          width="100"
          title="heart"
          className="icons heart"
        >
          <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
        </svg>
        <span className="icon__text heart">
          {Math.max(postData.LikedBy.length - 1, 0)}
        </span>
        <svg
          viewBox="0 0 512 512"
          width="100"
          title="comment"
          className="icons comment"
        >
          <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" />
        </svg>
        <span className="icon__text comment">{postData.comments}</span>
      </div>
      <img src={postData.imageUrl} alt={postData.caption} />
    </Link>
  );
};

export default ProfilePhoto;
