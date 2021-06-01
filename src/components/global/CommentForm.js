import React, { useState } from "react";
import "../css/global/CommentForm.css";

function CommentForm({ handleCommentFormSubmit, Placeholder }) {
  const [Comment, setComment] = useState("");
  return (
    <form
      className="comment__form"
      onSubmit={(event) => {
        event.preventDefault();
        handleCommentFormSubmit(Comment);
        setComment("");
      }}
    >
      <input
        type="text"
        className="comment__form__input"
        value={Comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={Placeholder}
      />
      <input
        type="submit"
        value="Post"
        className="comment__form__submit"
        disabled={Comment === "" ? true : false}
      />
    </form>
  );
}

export default CommentForm;
