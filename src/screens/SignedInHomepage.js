import React, { useEffect, useRef, useState } from "react";
import Header from "../components/SignedInHomepage/Header";
import Post from "../components/SignedInHomepage/Post";
import "./css/SignedInHomepage.css";
// import FileUploadModal from "../components/SignedInHomepage/FileUploadModal";
import { areArraysDeepEqual } from "../utils/DeepEquals";

import { Link } from "react-router-dom";

import { fetchPosts, updateUserInfo, fetchFollowing } from "../actions";
import { connect } from "react-redux";
import Loader from "../components/global/Loader";
import PeopleSuggestion from "../components/global/PeopleSuggestion";

/**Page shown to the user on '/' route when user is signed in*/
function SignedInHomepage({
  fetchPosts,
  updateUserInfo,
  fetchFollowing,
  posts,
  User,
  following = [],
}) {
  const [IsModalShowing, setModalShowing] = useState(false);
  const [IsPeopleSuggestionLoaded, setIsPeopleSuggestionLoaded] =
    useState(false);
  const [Following, setFollowing] = useState([]);

  const userFollowingRef = useRef(User.following);

  if (!areArraysDeepEqual(userFollowingRef.current, User.following)) {
    userFollowingRef.current = User.following;
  }

  // console.log(User.following);
  useEffect(() => {
    fetchPosts();
    fetchFollowing();
  }, []);

  /**If user has uploaded his own post and not followed any user
   * then safe-gaurds against loading the People Suggestion's.
   */
  useEffect(() => {
    if (posts.length > 0) {
      setIsPeopleSuggestionLoaded(false);
    }
  }, [posts.length]);

  useEffect(() => {
    if (following.length > 0) {
      setFollowing(following);
    }
  }, [following.length]);

  const renderPosts = () => {
    /**If this people suggestion is loaded then in further renders don't proceed to fetchPosts */
    if (
      IsPeopleSuggestionLoaded ||
      (posts.length === 0 && User.following.length === 1)
    ) {
      if (!IsPeopleSuggestionLoaded) setIsPeopleSuggestionLoaded(true);

      return (
        <PeopleSuggestion
          paraText="Welcome to Instagram"
          headerText="When you follow somebody you can see their photos here."
        />
      );
    }

    if (posts.length === 0) return <Loader />;

    const renderedPosts = posts.map((post) => {
      return (
        <Post
          key={post.id}
          data={post.data}
          postId={post.id}
          following={Following}
          isHomepage
        />
      );
    });

    return (
      <>
        {renderedPosts}
        <div className="feed__footer">
          <div className="footer__checkmark">
            <span className="line line--left"></span>

            <span className="checkmark">
              <svg viewBox="0 0 512 512" width="100" title="check-circle">
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
              </svg>
            </span>

            <span className="line line--right"></span>
          </div>

          <div className="footer__content">
            <h2 className="content__header">You're All Caught Up</h2>
            <h3 className="content__subheader">
              Follow more people{" "}
              <Link to="/user/suggestion" className="subheader__link">
                here
              </Link>
            </h3>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={`SignedInHomepage ${IsModalShowing ? "no-scroll" : ""} `}>
      <Header setModalShowing={setModalShowing} />

      <div className="SignedInHomepage__posts">{renderPosts()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.posts),
    User: state.user,
    following: state.following,
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  updateUserInfo,
  fetchFollowing,
})(SignedInHomepage);
