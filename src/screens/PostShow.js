import React, { useEffect, useState } from "react";
import Post from "../components/SignedInHomepage/Post";
import Header from "../components/SignedInHomepage/Header";
import "./css/PostShow.css";

import { fetchPost, fetchUserDetail } from "../actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/global/Loader";

function PostShow({
  post,
  fetchPost,
  fetchUserDetail,
  match,
  User,
  following = [],
}) {
  const [IsModalShowing, setModalShowing] = useState(false);

  const id = match.params.id;
  const preview = match.params.preview;

  /**fetch the post that needs to be shown */
  useEffect(() => {
    fetchPost(id);
  }, [id]);

  /**fetch the user's details who made this post */
  useEffect(() => {
    if (post?.id) {
      fetchUserDetail(post.data.userId);
    }
  }, [post?.id]);

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
      <div className={`PostShow ${IsModalShowing ? "no-scroll" : ""}`}>
        <Header setModalShowing={setModalShowing} />
        <div className="PostShow--postWrapper">
          {post ? (
            <Post data={post?.data} postId={post?.id} following={following} />
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
  return {
    post: state.posts[ownProps.match.params.id],
    User: state.user,
    following: state.following,
  };
};

export default connect(mapStateToProps, {
  fetchPost,
  fetchUserDetail,
})(PostShow);
