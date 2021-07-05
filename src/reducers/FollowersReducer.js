import { SIGN_OUT } from "../actions/types";

const INIT_STATE = {};

const FollowersReducer = (followers = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_FOLLOWERS":
      return action.payload;

    case SIGN_OUT:
      return INIT_STATE;

    default:
      return followers;
  }
};

export default FollowersReducer;
