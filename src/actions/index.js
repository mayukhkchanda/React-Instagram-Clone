import { SIGN_IN, SIGN_OUT, FETCH_POSTS } from "./types";
import history from "../history";
import { db } from "../firebase";

export const signin = (user) => {
  history.push("/");

  return {
    type: SIGN_IN,
    payload: user,
  };
};

export const signout = () => {
  history.push("/");

  return {
    type: SIGN_OUT,
    payload: null,
  };
};

export const fetchPosts = () => async (dispatch) => {
  const posts = await db
    .collection("posts")
    .get()
    .then((querySnapshot) => {
      /*  querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data());
            }); */

      //console.log(querySnapshot);

      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
    });

  //console.log(posts);

  dispatch({
    type: FETCH_POSTS,
    payload: posts,
  });
};
