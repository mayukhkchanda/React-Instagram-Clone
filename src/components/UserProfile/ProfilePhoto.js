import React from "react";
import "./css/ProfilePhoto.css";

const ProfilePhoto = ({ postData }) => {
  /* return (
    <div className="profile__photos">
      <figure className="profile__photo">
        <img
          src="https://images.unsplash.com/photo-1622020886177-239ee6e69b39?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcyMjM2Mg&ixlib=rb-1.2.1&q=85"
          alt=""
        />
      </figure>

      <figure className="profile__photo">
        <img
          src="https://images.unsplash.com/photo-1623235948057-1f514d84142b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcyMjM2Mg&ixlib=rb-1.2.1&q=85"
          alt=""
        />
      </figure>

      <figure className="profile__photo">
        <img
          src="https://images.unsplash.com/photo-1622660515427-9d05e6d102bf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcyMjM2Mg&ixlib=rb-1.2.1&q=85"
          alt=""
        />
      </figure>

      <figure className="profile__photo">
        <img
          src="https://images.unsplash.com/photo-1622020886177-239ee6e69b39?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcyMjM2Mg&ixlib=rb-1.2.1&q=85"
          alt=""
        />
      </figure>

      <figure className="profile__photo">
        <img
          src="https://images.unsplash.com/photo-1622020886177-239ee6e69b39?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcyMjM2Mg&ixlib=rb-1.2.1&q=85"
          alt=""
        />
      </figure>

      <figure className="profile__photo">
        <img
          src="https://images.unsplash.com/photo-1622044041409-ec13a2140c56?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcyMzI4Ng&ixlib=rb-1.2.1&q=85"
          alt=""
        />
      </figure>
    </div>
  ); */

  return (
    <figure className="profile__photo">
      <img src={postData.imageUrl} alt={postData.caption} />
    </figure>
  );
};

export default ProfilePhoto;
