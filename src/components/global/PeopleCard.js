import React, { useEffect, useState } from "react";
import "../css/global/PeopleCard.css";
import { db } from "../../firebase";
import UnfollowModal from "../global/UnfollowModal";

import { followUser, unfollowUser } from "../../actions";
import { connect } from "react-redux";

const PeopleCard = ({
  userData: { username, userId },
  followUser,
  unfollowUser,
}) => {
  const [UserPosts, setUserPosts] = useState([]);
  const [IsFollowing, setFollowing] = useState(false);

  /**to show un-follow modal */
  const [ShowUnfollowModal, setShowUnfollowModal] = useState(false);

  useEffect(() => {
    if (userId) {
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

            // console.log(posts);

            setUserPosts(posts);
          }
        });
    }
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

      // setFollowing(false);
      /**call un-follow action creator here */
      // unfollowUser(userId);
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
          src="https://www.instaclone.net/static/media/default-avatar.522560c8.png"
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
        <UnfollowModal
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
