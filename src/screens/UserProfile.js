import React, { useEffect, useState } from "react";
import Header from "../components/SignedInHomepage/Header";
import ProfileHeader from "../components/UserProfile/ProfileHeader";
import ProfileBody from "../components/UserProfile/ProfileBody";

import { fetchPostOfUserWithId, fetchFollowers } from "../actions";
import { connect } from "react-redux";

const UserProfile = ({
  fetchPostOfUserWithId,
  User,
  UserPosts,
  fetchFollowers,
  Followers,
}) => {
  const [IsModalShowing, setIsModalShowing] = useState(false);

  useEffect(() => {
    fetchPostOfUserWithId(User.userId);
    fetchFollowers();
  }, [User.userId]);

  // console.log(UserPosts);
  // console.log(Followers);

  return (
    <div className={`UserProfile ${IsModalShowing ? "no-scroll" : ""}`}>
      <Header setModalShowing={setIsModalShowing} />
      <div className="profile">
        <ProfileHeader
          User={User}
          numFollowers={Followers?.length > 0 ? Followers.length : 0}
          numPosts={UserPosts?.length > 0 ? UserPosts.length : 0}
        />
        <ProfileBody UserPosts={UserPosts} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    UserPosts: Object.values(state.posts),
    User: state.user,
    Followers: state.followers,
  };
};

export default connect(mapStateToProps, {
  fetchPostOfUserWithId,
  fetchFollowers,
})(UserProfile);
