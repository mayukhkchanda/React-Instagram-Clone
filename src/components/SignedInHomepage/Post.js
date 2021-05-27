import React from "react";
import "../css/SignedInHomepage/Post.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

function Post({
  postId,
  data: { username, imageUrl, caption, userId },
  UserUID,
}) {
  const renderAdmin = () => {
    return (
      <div className="admin--div">
        <Link to={`/edit/${postId}`} className="button edit">
          Edit
          <i className="fa fa-edit"></i>
        </Link>
        <Link to={`/delete/${postId}`} className="button delete">
          Delete
          <i className="fa fa-trash"></i>
        </Link>
      </div>
    );
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="header__userInfo">
          <div className="header__avatar">
            {username ? username[0].toUpperCase() : ""}
          </div>
          <div className="header__name">{username}</div>
        </div>
        <div className="header__adminButtons">
          {UserUID === userId ? renderAdmin() : null}
        </div>
      </div>
      <Link to={`/show/${postId}/false`}>
        <img className="post_image" src={imageUrl} alt={caption} />
      </Link>

      <div className="post_caption">
        <h3>
          <strong>{username}</strong> {caption}
        </h3>
      </div>
    </div>
  );
}

export default connect((state) => {
  return { UserUID: state.user.userId };
}, {})(Post);
