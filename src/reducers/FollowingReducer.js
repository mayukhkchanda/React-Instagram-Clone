import { FETCH_FOLLOWING, SIGN_OUT } from "../actions/types";

const INIT_STATE = [];

const followingReducer = (following = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return action.payload;

    case SIGN_OUT:
      return INIT_STATE;

    default:
      return following;
  }
};

export default followingReducer;
