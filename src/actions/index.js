import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
} from "./types";
import history from "../history";
import { db } from "../firebase";
import firebase from "firebase";

export const signin = (user) => {
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

//post ={ caption:'...', imageUrl:'...' }
export const createPost = (post) => async (dispatch, getState) => {
  const username = getState().user.username;

  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

  const postRef = await db
    .collection("posts")
    .add({
      username: username,
      caption: post.caption,
      imageUrl: post.imageUrl,
      timestamp: serverTimestamp,
    })
    .then(async (docRef) => {
      //successfully posted
      const uploadedPost = await db
        .collection("posts")
        .doc(docRef.id)
        .get()
        .then((doc) => {
          return { id: doc.id, data: doc.data() };
        });

      return uploadedPost;
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(postRef);

  dispatch({
    type: CREATE_POST,
    payload: postRef,
  });

  history.push(`/show/${postRef.id}/true`);
};

export const fetchPost = (id) => async (dispatch) => {
  const post = await db
    .collection("posts")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        return { id: doc.id, data: doc.data() };
      } else {
        return { id: id, data: {} };
      }
    })
    .catch((error) => console.log(error));

  dispatch({
    type: FETCH_POST,
    payload: post,
  });
};
