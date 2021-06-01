import React, { useEffect, useRef, useState } from "react";
import "../css/SignedInHomepage/Post.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import SpinnerSmall from "../global/SpinnerSmall";

import firebase from "firebase";
import { db } from "../../firebase";
import CommentForm from "../global/CommentForm";

function Post({
  postId,
  data: { username, imageUrl, caption, userId },
  UserUID,
  Username,
  editMode,
  handleCancelEdit,
  handleConfirmEdit,
  allComments,
}) {
  const [EditedCaption, setEditedCaption] = useState(caption ?? "");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [Comments, setComments] = useState([]);

  const editCaptionInputRef = useRef(null);

  useEffect(() => {
    if (editMode && editCaptionInputRef) {
      editCaptionInputRef.current.focus();
    }
  }, [editCaptionInputRef]);

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        /* .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        }); */
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
  }, []);

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
      {renderCaption()}
      {renderComments()}
      {/* <div className="post__comment">
        <div className="comment__user">Test</div>
        <div className="comment__text">Test Commnent. Will be removed</div>
      </div> */}
    </div>
  );
}

export default connect((state) => {
  return { UserUID: state.user.userId, Username: state.user.username };
}, {})(Post);
