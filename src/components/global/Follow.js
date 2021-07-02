import React, { useState } from "react";
import "../css/global/Follow.css";

/**un-used. Careful when using this component. Need to pass a function as a props */
const Follow = ({
  headerText,
  subHeaderText,
  noFollowText,
  listOfUsers,
  btnText,
  OnConfirmClick,
}) => {
  const [ShowModal, setShowModal] = useState(false);
  const [SelectedUser, setSelectedUser] = useState(null);

  const handleConfirmClick = () => {
    setShowModal(false);
    /**send the user id to the confirm function */
    OnConfirmClick(SelectedUser.userId);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  const renderUsers = () => {
    if (listOfUsers.length == 0) {
      return (
        <div className="no__followers">
          <svg viewBox="0 0 640 512" width="100" title="user-plus">
            <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
          </svg>
          <p>{noFollowText}</p>
        </div>
      );
    }

    const renderedList = listOfUsers.map((user) => {
      return (
        <div key={user.userId} className="user">
          <div className="user__info">
            <img
              src="https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
              alt={`${user.userData.username} avatar`}
            />
            <span className="info__name">{user.userData.username}</span>
          </div>

          <button
            onClick={() => {
              setSelectedUser(user);
              setShowModal(true);
            }}
            className="button"
          >
            {btnText}
          </button>
        </div>
      );
    });

    return renderedList;
  };

  return (
    <div className="Follow">
      <Header />

      <div className="Follow__body">
        <div className="body__header">
          <h2>{headerText}</h2>
          <h3>{subHeaderText}</h3>
        </div>
        {renderUsers()}

        {ShowModal && SelectedUser && SelectedUser !== {} ? (
          <Modal
            isUnFollowModal
            Username={SelectedUser.userData.username}
            onConfirmClick={handleConfirmClick}
            onCancelClick={handleCancelClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Follow;
