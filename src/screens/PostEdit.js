import React, { useEffect } from "react";
import Post from "../components/SignedInHomepage/Post";
import Header from "../components/SignedInHomepage/Header";
import Loader from "../components/global/Loader";
import "./css/PostEdit.css";

import history from "../history";

import { fetchPost, editPost } from "../actions";
import { connect } from "react-redux";

function PostEdit({ post, fetchPost, editPost, match }) {
  const postId = match.params.id;

  useEffect(() => {
    fetchPost(postId);
  }, []);

  const handleCancelEdit = () => {
    /**redirect to post show */
    history.push(`/show/${postId}/false`);
  };

  const handleConfirmEdit = (newCaption) => {
    /**show loader and when updated redirect to post show */
    editPost(postId, newCaption);
  };

  return (
    <div className="PostEdit">
      <Header />

      {post ? (
        <div className="PostEdit__postWrapper">
          <Post
            data={post?.data}
            postId={post?.id}
            editMode
            handleCancelEdit={handleCancelEdit}
            handleConfirmEdit={handleConfirmEdit}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchPost,
  editPost,
})(PostEdit);
