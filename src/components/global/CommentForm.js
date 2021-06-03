import React, { useEffect, useRef, useState } from "react";
import "../css/global/CommentForm.css";

function CommentForm({ handleCommentFormSubmit, Placeholder }) {
  const [Comment, setComment] = useState("");

  const commentFormInputRef = useRef(null);

  useEffect(() => {
    if (commentFormInputRef && commentFormInputRef?.current)
      commentFormInputRef.current.focus();
  }, [commentFormInputRef.current]);

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
        ref={commentFormInputRef}
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
