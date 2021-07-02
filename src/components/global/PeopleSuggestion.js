import React, { useEffect } from "react";
import "../css/global/PeopleSuggestion.css";

// import { Link } from "react-router-dom";

import { fetchUsers } from "../../actions";
import { connect } from "react-redux";
import PeopleCard from "./PeopleCard";

/**Shows a list of users who the current user is not following */
const PeopleSuggestion = ({
  fetchUsers,
  SuggestedUsers,
  paraText,
  headerText,
}) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUsers = () => {
    if (SuggestedUsers.length === 0) return null;

    const renderedList = SuggestedUsers.map((suggestedUser) => {
      //   console.log(suggestedUser);
      return (
        <PeopleCard
          key={suggestedUser.userId}
          userData={suggestedUser.userData}
        />
      );
    });

    return renderedList;
  };

  return (
    <div className="UserSuggestions">
      <p>{paraText}</p>
      <h3>{headerText}</h3>

      <div className="suggested-users">{renderUsers()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { SuggestedUsers: Object.values(state.suggestedUsers) };
};

export default connect(mapStateToProps, {
  fetchUsers,
})(PeopleSuggestion);
