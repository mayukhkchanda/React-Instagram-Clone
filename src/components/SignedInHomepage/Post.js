import React, { useState } from "react";
import "../css/SignedInHomepage/Post.css";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

function Post({
  postId,
  data: { username, imageUrl, caption, userId },
  UserUID,
  editMode,
  handleCancelEdit,
  handleConfirmEdit,
}) {
  const [EditedCaption, setEditedCaption] = useState(caption ?? "");

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
        <i
          onClick={() => handleConfirmEdit(EditedCaption)}
          className="fa fa-check"
        ></i>
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
    </div>
  );
}

export default connect((state) => {
  return { UserUID: state.user.userId };
}, {})(Post);
