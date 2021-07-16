import React, { useEffect, useRef, useState } from "react";
import "../css/SignedInHomepage/Post.css";
import SpinnerSmall from "../global/SpinnerSmall";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addLike, addUnlike, incrementComment } from "../../actions";

import firebase from "firebase";
import { db } from "../../firebase";
import CommentForm from "../global/CommentForm";

function Post({
  postId,
  data: { username, imageUrl, caption, userId, LikedBy, timestamp }, //userId is the id of user who made the post
  UserUID, // UserUID is signed-in user's id
  Username,
  following = [],
  ProfilePhotoUrl,
  isHomepage,
  editMode,
  handleCancelEdit,
  handleConfirmEdit,
  allComments,
  addLike,
  addUnlike,
  incrementComment,
}) {
  const [EditedCaption, setEditedCaption] = useState(caption ?? "");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [Comments, setComments] = useState([]);
  const [ShowDropdown, setShowDropdown] = useState(false);
  /**if the user is present in LikedBy then he has definately liked
   * else we don't know if the user has un-liked
   */
  const [Liked, setLiked] = useState(
    LikedBy?.indexOf(UserUID) !== -1 ? true : null
  );
  const [DenouncedLiked, setDenouncedLiked] = useState(Liked);
  const [Likes, setLikes] = useState(LikedBy?.length);
  /**to record user intraction and change liked only when user has clicked on it */
  const [UserClicked, setUserClicked] = useState(false);
  const [ShowCommentForm, setShowCommentForm] = useState(false);

  const [PostDate, setPostDate] = useState(null);

  /**profile image url of the user who made this post */
  const [ProfileUrl, setProfileUrl] = useState(null);

  const editCaptionInputRef = useRef(null);

  /**Set the profile url of the user who made this post from the following array's data */
  useEffect(() => {
    if (ProfilePhotoUrl) {
      setProfileUrl(ProfilePhotoUrl);
    } else if (following.length > 0) {
      following
        .filter((u) => u.userId === userId)
        .forEach((u) => {
          /**if there is an user object that matches the userId, then update the state */
          if (u && u?.userData) {
            setProfileUrl(u.userData.profileUrl);
          }
        });
    }
  }, [following.length]);

  /**Setting the date from epoch to UTC time */
  useEffect(() => {
    /**setting the initial date to the epoch and add UTC units */
    const epoch = new Date(0);
    if (timestamp !== {}) {
      epoch.setUTCSeconds(timestamp?.seconds);

      setPostDate(
        epoch.toLocaleString("default", { month: "long" }).toUpperCase() +
          " " +
          epoch.getDate() +
          "," +
          epoch.getFullYear()
      );
    }
  }, [timestamp]);

  const dropdownContentRef = useRef();
  /**add a event listener on document body to close dropdown when outside of drop down is clicked */
  useEffect(() => {
    if (userId === UserUID && isHomepage) {
      const closeDropDown = (event) => {
        //if the clicked on somewhere inside the dropdown
        if (
          dropdownContentRef?.current &&
          !dropdownContentRef.current.contains(event.target)
        )
          setShowDropdown(false);
      };

      document.body.addEventListener("click", closeDropDown);
      return () => {
        document.body.removeEventListener("click", closeDropDown);
      };
    }
  }, []);

  /**Focuses automatically when in edit comment mode */
  useEffect(() => {
    if (editMode && editCaptionInputRef) {
      editCaptionInputRef.current.focus();
    }
  }, [editCaptionInputRef]);

  /**for comment set up a real-time listener.  */
  useEffect(() => {
    let unsubscribe;

    if (postId) {
      /** Sets up real-time listener for comments  */
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => {
              return { id: doc.id, data: doc.data() };
            })
          );
        });
    }

    return () => {
      if (postId) unsubscribe();
    };
  }, [postId]);

  /**set a timeout to denounce the user clicking on like button multiple time */
  useEffect(() => {
    setLikes(UserClicked && Liked ? Likes + 1 : Math.max(Likes - 1, 0));
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
        <span className="button-span">
          <span
            className="like-button-span"
            onClick={() => {
              setUserClicked(true);
              setLiked(!Liked);
            }}
          >
            <svg
              aria-label={Liked ? "unlike" : "like"}
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
          <span
            className="comment-button-span"
            onClick={() => {
              setShowCommentForm(true);
            }}
          >
            <svg
              aria-label="Comment"
              className="button"
              fill="#262626"
              height="24"
              viewBox="0 0 48 48"
              width="24"
            >
              <path
                clipRule="evenodd"
                d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
        </span>
        {Likes > 0 ? (
          <span className="like-text-span">{`${Likes} ${
            Likes > 1 ? "likes" : "like"
          }`}</span>
        ) : null}
      </div>
    );
  };

  /**Edit & Delete buttons */
  const renderAdmin = () => {
    return (
      <div
        className="dropdown"
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown(!ShowDropdown);
        }}
        ref={dropdownContentRef}
      >
        <button className="dropdown-button">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </button>
        <div>
          <div
            className="dropdown-content"
            style={{ display: ShowDropdown ? "block" : "none" }}
          >
            <Link to={`/edit/${postId}`}>Edit</Link>
            <Link to={`/delete/${postId}`}>Delete</Link>
          </div>
        </div>
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
    ) : caption !== "" ? (
      <div className="post_caption">
        <h3>
          <strong>{username}</strong> <span className="">{caption}</span>
        </h3>
      </div>
    ) : null;
  };

  /* Also, updates the comments collection of this post and calls an action creator to increment count */
  const handleCommentFormSubmit = (comment) => {
    /**Not called in action creator as this would not change state */
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        commentText: comment,
        commentUser: Username,
        CommentUserId: UserUID,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        incrementComment(postId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const renderComments = () => {
    const renderedComments = Comments.filter((el, index) =>
      allComments ? true : index < 3
    ).map(({ id, data: { commentUser, commentText } }) => {
      return (
        <div key={id} className="post__comment">
          <div className="comment__user">{commentUser}</div>
          <div className="comment__text">{commentText}</div>
        </div>
      );
    });

    return (
      <div className="post__comment--wrapper">
        {ShowCommentForm ? (
          <CommentForm
            handleCommentFormSubmit={handleCommentFormSubmit}
            Placeholder="Add a comment..."
          />
        ) : null}
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
            {ProfileUrl ? (
              <img src={ProfileUrl} alt={`${username} avatar`} />
            ) : username ? (
              username[0].toUpperCase()
            ) : (
              ""
            )}
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
      <div className="post__footer">
        {renderLikes()}
        {renderCaption()}
        {renderComments()}
        {PostDate !== null ? <p className="PostDate">{PostDate}</p> : null}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      UserUID: state.user.userId,
      Username: state.user.username,
    };
  },
  {
    addLike,
    addUnlike,
    incrementComment,
  }
)(Post);
