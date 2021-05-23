import React from "react";
import "../css/SignedInHomepage/Post.css";

function Post({ data: { username, imageUrl, caption } }) {
  return (
    <div className="post">
      <div className="post__header">
        <div className="header__avatar">
          {username ? username[0].toUpperCase() : ""}
        </div>
        <div className="header__name">{username}</div>
      </div>

      <img className="post_image" src={imageUrl} alt={caption} />

      <div className="post_caption">
        <h3>
          <strong>{username}</strong> {caption}
        </h3>
      </div>
    </div>
  );
}

export default Post;
