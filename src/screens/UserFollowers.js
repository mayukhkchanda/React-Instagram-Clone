import React, { useEffect, useState } from "react";
import "./css/UserFollowers.css";
import Header from "../components/SignedInHomepage/Header";
import User from "../components/UserFollowers/User";

import { fetchFollowers } from "../actions";
import { connect } from "react-redux";

// People who the follow the user
const UserFollowers = ({ fetchFollowers, Followers = [], SignedUser }) => {
  const [IsModalShowing, setModalShowing] = useState(false);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const renderFollowers = () => {
    if (Followers.length <= 1) {
      return (
        <div className="no__followers">
          <svg viewBox="0 0 640 512" width="100" title="user-plus">
            <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
          </svg>
          <p>When somebody follows you, you'll see them here.</p>
        </div>
      );
    }

    const renderedList = Followers.filter(
      (follower) => follower.userId !== SignedUser.userId
    ).map(({ userId, userData }) => {
      return <User key={userId} userData={userData} />;
    });

    return renderedList;
  };

  return (
    <div className={`UserFollower ${IsModalShowing ? "no-scroll" : ""}`}>
      <Header setModalShowing={setModalShowing} />

      <div className="UserFollower__body">
        <div className="body__header">
          <h2>Followers</h2>
          <h3>PEOPLE</h3>
        </div>
        {renderFollowers()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Followers: state.followers, SignedUser: state.user };
};

export default connect(mapStateToProps, {
  fetchFollowers,
})(UserFollowers);
