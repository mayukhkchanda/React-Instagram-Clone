import React from "react";
import "../css/SignedInHomepage/Post.css";

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <div className="header__avatar">M</div>
        <div className="header__name">Mayukh</div>
      </div>

      <img
        className="post_image"
        src="https://images.unsplash.com/photo-1570960288798-365950a204d4?ixid=MnwyMjA4NzZ8MHwxfHNlYXJjaHwxfHxtb3V0YWluc3xlbnwwfHx8fDE2MjE1Mjc0Mjg&ixlib=rb-1.2.1"
        alt="post-image"
      />

      <div className="post_caption">
        <h3>
          {" "}
          <strong>Mayukh</strong> hello world{" "}
        </h3>
      </div>
    </div>
  );
}

export default Post;
