import React, { useEffect, useState } from "react";
import Post from "../components/SignedInHomepage/Post";
import Header from "../components/SignedInHomepage/Header";
import "./css/PostShow.css";

import { fetchPost } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function PostShow({ post, fetchPost, match }) {
  const id = match.params.id;
  const showMessage = match.params.showMessage;

  useEffect(() => {
    console.log(id);
    fetchPost(id);
  }, [id]);

  return (
    <div class="PostShow">
      <Header />
      <div className="PostShow--postWrapper">
        {post ? (
          <Post data={post?.data} postId={post?.id} />
        ) : (
          <>
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
          </>
        )}
      </div>
      {showMessage === "true" ? (
        <div class="message">
          Your post was uploaded successfully. Go back to{" "}
          <Link to="/" href="#" class="home">
            Home
          </Link>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchPost,
})(PostShow);
