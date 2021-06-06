import React, { useEffect } from "react";
import "./css/PostComment.css";
import Header from "../components/SignedInHomepage/Header";
import Post from "../components/SignedInHomepage/Post";

import { fetchPost } from "../actions";
import { connect } from "react-redux";
import Loader from "../components/global/Loader";

function PostComment({ post, fetchPost, match }) {
  const id = match.params.id;

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const renderContent = () => {
    return (
      <div className="PostComment">
        <Header />

        {post ? (
          <div className="PostComment__postWrapper">
            <Post data={post?.data} postId={post?.id} allComments />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  };

  return renderContent();
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchPost,
})(PostComment);
