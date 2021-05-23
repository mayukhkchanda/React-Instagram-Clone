import { FETCH_POSTS } from "../actions/types";
import _ from "lodash";

const PostReducer = (posts = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id");

    default:
      return posts;
  }
};

export default PostReducer;
