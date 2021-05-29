import React, { useEffect, useState } from "react";
import Post from "../components/SignedInHomepage/Post";
import Header from "../components/SignedInHomepage/Header";
import "./css/PostShow.css";

import { fetchPost } from "../actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/global/Loader";

function PostShow({ post, fetchPost, match, User }) {
  const id = match.params.id;
  const preview = match.params.preview;

  useEffect(() => {
    //console.log(id);
    fetchPost(id);
  }, [id]);

  const renderNotification = () => {
    let previewText = "";
    if (preview === "view") {
      return null;
    } else if (preview === "upload") {
      previewText = "uploaded";
    } else if (preview === "update") {
      previewText = "updated";
    }

    return (
      <div className="message">
        Your post was {previewText + " "} successfully. Go back to{" "}
        <Link to="/" href="#" className="home">
          Home
        </Link>
      </div>
    );
  };

  const renderPostShowCotent = () => {
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
        {renderNotification()};
      </div>
    );
  };

  return User ? renderPostShowCotent() : <Redirect to="/" />;
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id], User: state.user };
};

export default connect(mapStateToProps, {
  fetchPost,
})(PostShow);
