import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_POSTS,
  FETCH_POST,
  FETCH_USERS,
  FETCH_FOLLOWERS,
  FETCH_FOLLOWING,
  FETCH_POST_OF_USER,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_USER_INFO,
  CREATE_USER_DOC,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "./types";
import history from "../history";
import { db } from "../firebase";
import firebase from "firebase";

export const signin = (user) => async (dispatch) => {
  const userRef = await db
    .collection("users")
    .doc(user.userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          userId: doc.id,
          email: doc.data().email,
          username: doc.data().username,
          following: doc.data().following,
        };
      } else {
        //new user just got created and user data is getting updated
        return {
          userId: user.userId,
          email: user.email,
          username: user.username,
          following: [user.userId],
        };
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log(userRef);

  dispatch({
    type: SIGN_IN,
    payload: userRef,
  });
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

/** Fetch posts of only the people who the user is following*/
export const fetchPosts = () => async (dispatch, getState) => {
  // const posts = await db
  //   .collection("posts")
  //   .orderBy("timestamp", "desc") //get the lastest created post
  //   .get()
  //   .then((querySnapshot) => {
  //     return querySnapshot.docs.map((doc) => {
  //       return { id: doc.id, data: doc.data() };
  //     });
  //   });

  const following = getState().user.following;

  // console.log(following);

  // Invalid Query. A non-empty array is required for 'in' filters
  const posts = db
    .collection("posts")
    .where("userId", "in", following)
    // .orderBy("timestamp", "desc") //would require composite index to work
    .limit(5)
    .get()
    .then(async (querySnapshot) => {
      /* querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      }); */
      // console.log(querySnapshot);
      const allPosts = await querySnapshot.docs.map((doc) => {
        // console.log(doc.id, " => ", doc.data());
        return { id: doc.id, data: doc.data() };
      });

      return allPosts;
    })
    .catch((error) => console.log(error));

  //getting Promise back
  Promise.resolve(posts).then(function (value) {
    // console.log(value);
    dispatch({
      type: FETCH_POSTS,
      payload: value,
    });
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
      LikedBy: [""],
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

/** Fetch a particular post with post id */
export const fetchPost = (id) => async (dispatch, getState) => {
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

/**Fetch all posts made by this user with userId. Used in profile screen */
export const fetchPostOfUserWithId = (userId) => async (dispatch) => {
  const userPosts = await db
    .collection("posts")
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      //if there are any post made by this user
      if (querySnapshot.docs.length > 0) {
        /**map all posts objects to an array */
        const posts = querySnapshot.docs.map((doc) => {
          // console.log(doc.id, " => ", doc.data());
          return { id: doc.id, data: doc.data() };
        });
        return posts;
      } else {
        /**return empty array */
        return [];
      }
    });

  // console.log(userPosts);

  dispatch({
    type: FETCH_POST_OF_USER,
    payload: userPosts,
  });
};

/**Fetch all the followers of this user i.e. this user's followers */
export const fetchFollowers = () => async (dispatch, getState) => {
  const userId = getState().user.userId;

  const followers = await db
    .collection("users")
    .where("following", "array-contains", userId)
    .get()
    .then((querySnapshot) => {
      //if any user follows current user
      if (querySnapshot.docs.length > 0) {
        /**map all user documents to any array */
        const Followers = querySnapshot.docs.map((doc) => {
          // console.log(doc.id, " => ", doc.data());
          return { userId: doc.id, userData: doc.data() };
        });
        return Followers;
      } else {
        /**return empty array */
        return [];
      }
    })
    .catch((err) => console.log(err));

  dispatch({
    type: FETCH_FOLLOWERS,
    payload: followers,
  });
};

/** Remove the signed-in user from the following of the provided user's id */
export const removeFollower = (userId) => async (dispatch, getState) => {
  // this user id needs to be removed from the following
  // array of the userId
  const signedInUserId = getState().user.userId;

  // remove the signed-in user's id from the provided user's userId
  db.collection("users")
    .doc(userId)
    .update({
      following: firebase.firestore.FieldValue.arrayRemove(signedInUserId),
    })
    .then(() => console.log("User removed successfully"))
    .catch((err) => console.log(err));
};

/**Fetch all users who the currently signed-in user follows */
export const fetchFollowing = () => async (dispatch, getState) => {
  const following = getState().user.following;

  const UserFollowing = await db
    .collection("users")
    .where("userId", "in", following)
    .get()
    .then((querySnapshot) => {
      //if this user is following some other user
      if (querySnapshot.docs.length > 0) {
        /**map all user docs to an array */
        const Followings = querySnapshot.docs.map((doc) => {
          // console.log(doc.id, " => ", doc.data());
          return { userId: doc.id, userData: doc.data() };
        });
        return Followings;
      } else {
        /**return empty array */
        return [];
      }
    })
    .catch((err) => console.log(err));

  dispatch({
    type: FETCH_FOLLOWING,
    payload: UserFollowing,
  });
};

/**Fetch the list of users who are !!NOT FOLLOWED!! by the user*/
export const fetchUsers = () => async (dispatch, getState) => {
  const following = getState().user.following;

  const users = await db
    .collection("users")
    .where("userId", "not-in", following)
    .limit(10)
    .get()
    .then(async (querySnapshot) => {
      const usersRef = await querySnapshot.docs.map((doc) => {
        // console.log(doc.id, " => ", doc.data());
        return { userId: doc.id, userData: doc.data() };
      });

      return usersRef;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  // console.log(users);

  dispatch({
    type: FETCH_USERS,
    payload: users,
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
      //document successfully deleted
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

/**Get user's following */
export const updateUserInfo = (newUser) => async (dispatch, getState) => {
  const userId = newUser.userId;

  const userInfo = await db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          userId: doc.id,
          email: doc.data().email,
          username: doc.data().username,
          following: doc.data().following,
        };
      }
    });

  console.log(userInfo);

  dispatch({
    type: UPDATE_USER_INFO,
    payload: userInfo,
  });
};

/**Create a new document in 'users' collection for this user */
export const createUserDoc = (newUser) => async (dispatch) => {
  const userRef = await db
    .collection("users")
    .doc(newUser.userId)
    .set({
      userId: newUser.userId,
      email: newUser.email,
      username: newUser.username,
      following: newUser.following,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(async (docRef) => {
      /**Migth not need this */
      const userInfo = await db
        .collection("users")
        .doc(newUser.userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return {
              userId: doc.id,
              email: doc.data().email,
              username: doc.data().username,
              following: doc.data().following,
            };
          }
        })
        .catch((err) => console.log(err));

      return userInfo;
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(userRef);

  dispatch({
    type: CREATE_USER_DOC,
    payload: userRef,
  });
};

/**Follow user */
export const followUser = (followersUserId) => async (dispatch, getState) => {
  const userId = getState().user.userId;

  const updatedUserRef = await db
    .collection("users")
    .doc(userId)
    .update({
      following: firebase.firestore.FieldValue.arrayUnion(followersUserId),
    })
    .then(async () => {
      const userRef = await db
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return {
              userId: doc.id,
              email: doc.data().email,
              username: doc.data().username,
              following: doc.data().following,
            };
          } else {
            console.log("No such document!");
          }
        });

      // console.log(userRef);

      return userRef;
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

  // console.log(updatedUserRef);

  dispatch({
    type: FOLLOW_USER,
    payload: updatedUserRef,
  });
};

/**Unfollow user */
export const unfollowUser =
  (unfollowersUserId) => async (dispatch, getState) => {
    const userId = getState().user.userId;

    const updatedUserRef = await db
      .collection("users")
      .doc(userId)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(unfollowersUserId),
      })
      .then(async () => {
        const userRef = await db
          .collection("users")
          .doc(userId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              return {
                userId: doc.id,
                email: doc.data().email,
                username: doc.data().username,
                following: doc.data().following,
              };
            } else {
              console.log("No such document!");
            }
          });

        return userRef;
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    dispatch({
      type: UNFOLLOW_USER,
      payload: updatedUserRef,
    });
  };
