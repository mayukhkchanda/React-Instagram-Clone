import React, { useEffect, useState } from "react";
import DeleteModal from "../components/global/DeleteModal";
import Post from "../components/SignedInHomepage/Post";
import Loader from "../components/global/Loader";
import Header from "../components/SignedInHomepage/Header";
import "./css/PostDelete.css";

import history from "../history";

import { fetchPost, deletePost } from "../actions";
import { connect } from "react-redux";

function PostDelete({ post, fetchPost, deletePost, match, User }) {
  const postId = match.params.id;

  const [IsModalShowing, setModalShowing] = useState(false);

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
    <div className={`PostDelete ${IsModalShowing ? "no-scroll" : ""}`}>
      <Header setModalShowing={setModalShowing} />
      {post ? (
        <>
          <div className="PostDelete_Post">
            <Post
              data={post?.data}
              postId={post?.id}
              ProfilePhotoUrl={User.profileUrl}
            />
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
  return { post: state.posts[ownProps.match.params.id], User: state.user };
};

export default connect(mapStateToProps, {
  fetchPost,
  deletePost,
})(PostDelete);
