import React, { useEffect, useState } from "react";
import Post from "../components/SignedInHomepage/Post";
import Header from "../components/SignedInHomepage/Header";
import "./css/PostShow.css";

import { fetchPost } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/global/Loader";

function PostShow({ post, fetchPost, match }) {
  const id = match.params.id;
  const showMessage = match.params.showMessage;

  useEffect(() => {
    //console.log(id);
    fetchPost(id);
  }, [id]);

  return (
    <div className="PostShow">
      <Header />
      <div className="PostShow--postWrapper">
        {post ? (
          <Post data={post?.data} postId={post?.id} />
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
      {showMessage === "true" ? (
        <div className="message">
          Your post was uploaded successfully. Go back to{" "}
          <Link to="/" href="#" className="home">
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
