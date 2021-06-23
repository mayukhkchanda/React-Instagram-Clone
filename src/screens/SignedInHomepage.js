import React, { useEffect, useRef, useState } from "react";
import Header from "../components/SignedInHomepage/Header";
import Post from "../components/SignedInHomepage/Post";
import "./css/SignedInHomepage.css";
import FileUploadModal from "../components/SignedInHomepage/FileUploadModal";
import { areArraysDeepEqual } from "../utils/DeepEquals";

import { Link } from "react-router-dom";

import { fetchPosts, updateUserInfo } from "../actions";
import { connect } from "react-redux";
import Loader from "../components/global/Loader";
import PeopleSuggestion from "../components/global/PeopleSuggestion";

/**Page shown to the user on '/' route when user is signed in*/
function SignedInHomepage({ fetchPosts, updateUserInfo, posts, User }) {
  const [ModalShow, setModalShow] = useState(false);
  const [IsPeopleSuggestionLoaded, setIsPeopleSuggestionLoaded] =
    useState(false);

  const userFollowingRef = useRef(User.following);

  if (!areArraysDeepEqual(userFollowingRef.current, User.following)) {
    // console.log("No");
    userFollowingRef.current = User.following;
  }

  // console.log(User.following);
  useEffect(
    () => {
      // if (User.following.length > 0) {
      fetchPosts();
      // }

      // return () => {
      //   s;
      // };
    },
    [
      /* userFollowingRef.current */
    ]
  );

  const renderPosts = () => {
    /**If this people suggestion is loaded then in further renders don't proceed to fetchPosts */
    if (
      IsPeopleSuggestionLoaded ||
      (posts.length === 0 && User.following.length == 1)
    ) {
      if (!IsPeopleSuggestionLoaded) setIsPeopleSuggestionLoaded(true);

      return <PeopleSuggestion />;
    }

    if (posts.length === 0) return <Loader />;

    return posts.map((post) => {
      return (
        <Post key={post.id} data={post.data} postId={post.id} isHomepage />
      );
    });
  };

  return (
    <div className={`SignedInHomepage ${ModalShow ? "no-scroll" : ""}`}>
      <Header />

      <div onClick={() => setModalShow(true)} className="ImageUpload">
        <div className="createPost--wrapper">
          <div className="createPost">
            <i className="fa fa-edit"></i>
            <span>Create a new post</span>
          </div>
        </div>
      </div>

      {ModalShow ? <FileUploadModal setModalShow={setModalShow} /> : null}

      <div className="SignedInHomepage__posts">{renderPosts()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { posts: Object.values(state.posts), User: state.user };
};

export default connect(mapStateToProps, {
  fetchPosts,
  updateUserInfo,
})(SignedInHomepage);
