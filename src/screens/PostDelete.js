import React, { useEffect } from "react";
import DeleteModal from "../components/global/DeleteModal";
import Post from "../components/SignedInHomepage/Post";
import Loader from "../components/global/Loader";
import Header from "../components/SignedInHomepage/Header";
import "./css/PostDelete.css";

import history from "../history";

import { fetchPost, deletePost } from "../actions";
import { connect } from "react-redux";

function PostDelete({ post, fetchPost, deletePost, match }) {
  const postId = match.params.id;

  useEffect(() => {
    fetchPost(postId);
  }, []);

  const onBackgroundClick = () => {
    /**redirect to show post when clicked on background */
    history.push(`/show/view/${postId}`);
  };

  const handleConfirmDelete = () => {
    /**call delete action creator */
    deletePost(postId);
  };

  return (
    <div className="PostDelete">
      <Header />
      {post ? (
        <>
          <div className="PostDelete_Post">
            <Post data={post?.data} postId={post?.id} />
          </div>
          <DeleteModal
            onBackgroundClick={onBackgroundClick}
            handleConfirmDelete={handleConfirmDelete}
          />
        </>
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
  deletePost,
})(PostDelete);
