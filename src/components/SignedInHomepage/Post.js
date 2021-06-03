import React, { useEffect, useRef, useState } from "react";
import "../css/SignedInHomepage/Post.css";
import SpinnerSmall from "../global/SpinnerSmall";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addLike, addUnlike } from "../../actions";

import firebase from "firebase";
import { db } from "../../firebase";
import CommentForm from "../global/CommentForm";

function Post({
  postId,
  data: { username, imageUrl, caption, userId, likes, LikedBy },
  UserUID,
  Username,
  editMode,
  handleCancelEdit,
  handleConfirmEdit,
  allComments,
  addLike,
  addUnlike,
}) {
  const [EditedCaption, setEditedCaption] = useState(caption ?? "");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [Comments, setComments] = useState([]);
  /**if the user is present in LikedBy then he has definately liked
   * else we don't know if the user has un-liked
   */
  const [Liked, setLiked] = useState(
    LikedBy.indexOf(UserUID) !== -1 ? true : null
  );
  const [DenouncedLiked, setDenouncedLiked] = useState(Liked);
  const [Likes, setLikes] = useState(LikedBy.length);
  /**to record user intraction and change liked only when user has clicked on it */
  const [UserClicked, setUserClicked] = useState(false);

  const editCaptionInputRef = useRef(null);

  /**Focuses automatically when in edit comment mode */
  useEffect(() => {
    if (editMode && editCaptionInputRef) {
      editCaptionInputRef.current.focus();
    }
  }, [editCaptionInputRef]);

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      //** Sets up real-time listener for comments */
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          //console.log(snapshot.docs);
          setComments(
            snapshot.docs.map((doc) => {
              // console.log(doc);
              return { id: doc.id, data: doc.data() };
            })
          );
        });
    }

    return () => {
      if (postId) unsubscribe();
    };
  }, [postId]);

  useEffect(() => {
    setLikes(UserClicked && Liked ? Likes + 1 : Math.max(Likes - 1, 0));
    /**set a timeout to denounce the user clicking on like button multiple time */
    let timeoutId = setTimeout(() => {
      setDenouncedLiked(Liked);
    }, 800);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [Liked]);

  /**Update likes when user likes/unlikes the post */
  useEffect(() => {
    /**if we know know user has liked/un-liked, then only execute */
    if (postId && DenouncedLiked != null) {
      /**if currently logged in user does not already exists and he has liked */
      if (LikedBy.indexOf(UserUID) === -1 && DenouncedLiked) {
        addLike(postId);
      } else if (LikedBy.indexOf(UserUID) !== -1 && !DenouncedLiked) {
        /**if currently logged in user does already exists and he has un-liked */
        addUnlike(postId);
      }
    }
  }, [DenouncedLiked]);

  const renderLikes = () => {
    return (
      <div className="likes-wrapper">
        <span
          className="like-button-span"
          onClick={() => {
            setUserClicked(true);
            setLiked(!Liked);
          }}
        >
          <svg
            aria-label="Unlike"
            className="button"
            fill={Liked ? "#ed4956" : "#262626"}
            height="24"
            viewBox="0 0 48 48"
            width="24"
          >
            {Liked ? (
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            ) : (
              <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            )}
          </svg>
        </span>
        {Likes > 0 ? (
          <span className="like-text-span">{`${Likes} Likes`}</span>
        ) : null}
      </div>
    );
  };

  const renderAdmin = () => {
    return (
      <div className="admin--div">
        <Link to={`/edit/${postId}`} className="button edit">
          Edit
          <i className="fa fa-edit"></i>
        </Link>
        <Link to={`/delete/${postId}`} className="button delete">
          Delete
          <i className="fa fa-trash"></i>
        </Link>
      </div>
    );
  };

  const renderEditModeHeader = () => {
    return editMode ? (
      <div className="editable__header">
        <div className="left-floated">
          <i onClick={handleCancelEdit} className="fa fa-times"></i> &nbsp;
          <span className="editable__header--name">Edit Info</span>
        </div>
        {!ShowSpinner ? (
          <i
            onClick={() => {
              handleConfirmEdit(EditedCaption);
              setShowSpinner(true);
            }}
            className="fa fa-check"
          />
        ) : (
          <SpinnerSmall />
        )}
      </div>
    ) : null;
  };

  const renderCaption = () => {
    return editMode ? (
      <form
        onSubmit={(event) => event.preventDefault()}
        className="editableCaption__form"
      >
        <input
          ref={editCaptionInputRef}
          type="text"
          className="editableCaption"
          value={EditedCaption}
          onChange={(e) => setEditedCaption(e.target.value)}
        />
      </form>
    ) : (
      <div className="post_caption">
        <h3>
          <strong>{username}</strong> {caption}
        </h3>
      </div>
    );
  };

  const handleCommentFormSubmit = (comment) => {
    db.collection("posts").doc(postId).collection("comments").add({
      commentText: comment,
      commentUser: Username,
      CommentUserId: UserUID,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const renderComments = () => {
    const renderedComments = Comments.filter((el, index) =>
      allComments ? true : index < 3
    ).map(({ id, data: { commentUser, commentText } }) => {
      //console.log(comment);
      return (
        <div key={id} className="post__comment">
          <div className="comment__user">{commentUser}</div>
          <div className="comment__text">{commentText}</div>
        </div>
      );
    });
    //console.log(Comments);
    return (
      <div className="post__comment--wrapper">
        <CommentForm
          handleCommentFormSubmit={handleCommentFormSubmit}
          Placeholder="Add a comment..."
        />
        {Comments.length > 3 && !allComments ? (
          <Link
            to={`/comments/${postId}`}
            className="post__comment--moreComments"
          >{`View all ${Comments.length} comments`}</Link>
        ) : null}
        {renderedComments}
      </div>
    );
  };

  return (
    <div className="post">
      {renderEditModeHeader()}
      <div className={`post__header ${editMode ? "edit-mode" : ""}`}>
        <div className="header__userInfo">
          <div className="header__avatar">
            {username ? username[0].toUpperCase() : ""}
          </div>
          <div className="header__name">{username}</div>
        </div>
        <div className="header__adminButtons">
          {UserUID === userId && !editMode ? renderAdmin() : null}
        </div>
      </div>
      <Link to={`/show/view/${postId}`}>
        <img className="post_image" src={imageUrl} alt={caption} />
      </Link>
      {renderLikes()}
      {renderCaption()}
      {renderComments()}
      {/* <div className="post__comment">
        <div className="comment__user">Test</div>
        <div className="comment__text">Test Commnent. Will be removed</div>
      </div> */}
    </div>
  );
}

export default connect(
  (state) => {
    return { UserUID: state.user.userId, Username: state.user.username };
  },
  {
    addLike,
    addUnlike,
  }
)(Post);
