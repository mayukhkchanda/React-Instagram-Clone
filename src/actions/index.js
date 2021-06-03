import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
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
  //history.push("/"); //this kicks back the user to the homepage when he's signed out

  return {
    type: SIGN_OUT,
    payload: null,
  };
};

/** Fetch all posts */
export const fetchPosts = () => async (dispatch, getState) => {
  /* console.log(Object.values(getState().posts).length);
  const getOptions =
    Object.values(getState().posts).length > 0
      ? { source: "cache" }
      : { source: "default" }; */

  const posts = await db
    .collection("posts")
    .orderBy("timestamp", "desc") //get the lastest created post
    .get(/* getOptions */)
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

//**Create a post  */
//post ={ caption:'...', imageUrl:'...' }
export const createPost = (post) => async (dispatch, getState) => {
  const username = getState().user.username;
  const userId = getState().user.userId;

  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

  const postRef = await db
    .collection("posts")
    .add({
      username: username,
      userId: userId,
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

  //console.log(postRef);

  dispatch({
    type: CREATE_POST,
    payload: postRef,
  });

  history.push(`/show/upload/${postRef.id}`);
};

/** Fetch a particular post */
export const fetchPost = (id) => async (dispatch) => {
  const post = await db
    .collection("posts")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log(doc.data());
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

//** Edit Caption of a post */
export const editPost = (postId, newCaption) => async (dispatch) => {
  const updatedPostRef = await db
    .collection("posts")
    .doc(postId)
    .update({
      caption: newCaption,
    })
    .then(async () => {
      const updatedPost = await db
        .collection("post")
        .doc(postId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return { id: doc.id, data: doc.data() };
          } else {
            return { id: postId, data: {} };
          }
        });

      return updatedPost;
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  //console.log(updatedPostRef);

  dispatch({
    type: EDIT_POST,
    payload: updatedPostRef,
  });

  history.push(`/show/update/${postId}/`);
};

/** Delete a particular post */
export const deletePost = (postId) => async (dispatch) => {
  await db
    .collection("posts")
    .doc(postId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted ");
      return {};
    })
    .catch((error) => {
      console.log(error);
    });

  dispatch({
    type: DELETE_POST,
    payload: postId,
  });

  history.push("/");
};

/**Add like on a post*/
export const addLike = (postId) => async (dispatch, getState) => {
  const UserUID = getState().user.userId;

  const updatePost = await db
    .collection("posts")
    .doc(postId)
    .update({
      LikedBy: firebase.firestore.FieldValue.arrayUnion(UserUID),
    })
    .then(async () => {
      const postRef = await db
        .collection("posts")
        .doc(postId)
        .get()
        .then((doc) => {
          return { id: doc.id, data: doc.data() };
        });

      return postRef;
    });

  //console.log(updatePost);

  dispatch({
    type: LIKE_POST,
    payload: updatePost,
  });
};

/**Add unlike on a post*/
export const addUnlike = (postId) => async (dispatch, getState) => {
  const UserUID = getState().user.userId;

  const updatePost = await db
    .collection("posts")
    .doc(postId)
    .update({
      LikedBy: firebase.firestore.FieldValue.arrayRemove(UserUID),
    })
    .then(async () => {
      const postRef = await db
        .collection("posts")
        .doc(postId)
        .get()
        .then((doc) => {
          return { id: doc.id, data: doc.data() };
        });

      return postRef;
    });

  //console.log(updatePost);

  dispatch({
    type: UNLIKE_POST,
    payload: updatePost,
  });
};
