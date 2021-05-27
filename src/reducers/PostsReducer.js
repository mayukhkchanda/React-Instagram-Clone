import {
  FETCH_POSTS,
  CREATE_POST,
  FETCH_POST,
  DELETE_POST,
} from "../actions/types";
import _ from "lodash";

const PostReducer = (posts = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id");

    case FETCH_POST:
    case CREATE_POST:
      return { ...posts, [action.payload.id]: action.payload };

    case DELETE_POST:
      return _.omit(posts, [action.payload]);

    default:
      return posts;
  }
};

export default PostReducer;
