import React, { useState } from "react";
import Header from "../components/SignedInHomepage/Header";
import PeopleSuggestion from "../components/global/PeopleSuggestion";

const NewFollowers = () => {
  const [IsModalShowing, setModalShowing] = useState(false);

  return (
    <div className={`newFollowers ${IsModalShowing ? "no-scroll" : ""} `}>
      <Header setModalShowing={setModalShowing} />
      <PeopleSuggestion
        paraText="Suggestions For You"
        headerText="When you follow somebody you can see their photos here."
      />
    </div>
  );
};

export default NewFollowers;
