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
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

/**fetching documents from a collection is shallow.
 * only the documents that are direct childrens are fetched
 * and not the sub-collections of the documents.
 * Sub-collections must be fetched seperately.
 */

/** Fetch all posts */
export const fetchPosts = () => async (dispatch, getState) => {
  const posts = await db
    .collection("posts")
    .orderBy("timestamp", "desc") //get the lastest created post
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
    });

  dispatch({
    type: FETCH_POSTS,
    payload: posts,
  });
};

//**Create a post  */
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
      LikedBy: [],
    })
    .then(async (docRef) => {
      //successfully posted
      //fetch the updated post so that state can be updated
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

  dispatch({
    type: CREATE_POST,
    payload: postRef,
  });

  //redirect the user to post-show component with a notification for post upload
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
        .collection("posts")
        .doc(postId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return { id: doc.id, data: doc.data() };
          } else {
            return { id: postId, data: {} };
          }
        })
        .catch((err) => console.log(err));

      return updatedPost;
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  dispatch({
    type: EDIT_POST,
    payload: updatedPostRef,
  });

  //redirect the user to post-show component with a notification for post update
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

  //redirect user to homepage
  history.push("/");
};

/**Add like on a post by adding the User id of the currently signed-in user*/
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

  dispatch({
    type: LIKE_POST,
    payload: updatePost,
  });
};

/**Add unlike on a post by removing the User id of the currently signed-in user*/
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

  dispatch({
    type: UNLIKE_POST,
    payload: updatePost,
  });
};
