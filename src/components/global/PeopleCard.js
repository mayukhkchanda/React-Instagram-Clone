import React, { useEffect, useState } from "react";
import "../css/global/PeopleCard.css";
import { db } from "../../firebase";
import Modal from "../global/Modal";

import { followUser, unfollowUser } from "../../actions";
import { connect } from "react-redux";

const PeopleCard = ({
  userData: { username, userId, profileUrl },
  followUser,
  unfollowUser,
}) => {
  const [UserPosts, setUserPosts] = useState([]);
  const [IsFollowing, setFollowing] = useState(false);

  const [ComponentUnmounted, setComponentUnmounted] = useState(false);

  /**to show un-follow modal */
  const [ShowUnfollowModal, setShowUnfollowModal] = useState(false);

  useEffect(() => {
    /**prevent state update after the component has umounted */
    if (!ComponentUnmounted && userId) {
      /**Fetch user's posts */
      db.collection("posts")
        .where("userId", "==", userId)
        .limit(3)
        .get()
        .then((querySnapshot) => {
          //if there are any post made by this user
          if (querySnapshot.docs.length > 0) {
            const posts = querySnapshot.docs.map((doc) => {
              // console.log(doc.id, " => ", doc.data());
              return { id: doc.id, data: doc.data() };
            });
            setUserPosts(posts);
          }
        });
    }

    return () => {
      setComponentUnmounted(true);
    };
  }, [userId]);

  const renderPosts = () => {
    if (UserPosts.length === 0) {
      return (
        <div className="no-posts">
          <h3>No Posts</h3>
          <h4>
            This user has no posts yet, follow them to see their future posts.
          </h4>
        </div>
      );
    }

    const renderedPosts = UserPosts.map((userpost) => {
      return (
        <figure key={userpost.id} className="people-post-figure">
          <img src={userpost.data.imageUrl} alt={userpost.data.caption} />
        </figure>
      );
    });

    return renderedPosts;
  };

  const handleUserFollow = () => {
    if (!IsFollowing) {
      setFollowing(true);
      /**call follow action creator here */
      followUser(userId);
    } else {
      setShowUnfollowModal(true);
    }
  };

  const handleCancelClick = () => {
    setShowUnfollowModal(false);
  };

  const handleConfirmClick = () => {
    setShowUnfollowModal(false);
    setFollowing(false);
    /**call un-follow action creator here */
    unfollowUser(userId);
  };

  return (
    <div className="people-card">
      <div className="people-avatar">
        <img
          src={
            profileUrl
              ? profileUrl
              : `${process.env.PUBLIC_URL}/assets/images/default_avatar_people.png`
          }
          alt="Avatar"
        />
        <h3 className="people-username">{username}</h3>
      </div>

      <div className="people-post">{renderPosts()}</div>

      <button
        onClick={() => {
          handleUserFollow();
        }}
        className="people-follow"
      >
        {IsFollowing ? "Following" : "Follow"}
      </button>

      {ShowUnfollowModal ? (
        <Modal
          isUnFollowModal
          Username={username}
          onConfirmClick={handleConfirmClick}
          onCancelClick={handleCancelClick}
        />
      ) : null}
    </div>
  );
};

export default connect(null, {
  followUser,
  unfollowUser,
})(PeopleCard);
