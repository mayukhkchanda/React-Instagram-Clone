const FollowersReducer = (followers = {}, action) => {
  switch (action.type) {
    case "FETCH_FOLLOWERS":
      return action.payload;

    default:
      return followers;
  }
};

export default FollowersReducer;
