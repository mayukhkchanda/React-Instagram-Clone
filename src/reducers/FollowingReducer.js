import { FETCH_FOLLOWING } from "../actions/types";

const followingReducer = (following = [], action) => {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return action.payload;

    default:
      return following;
  }
};

export default followingReducer;
