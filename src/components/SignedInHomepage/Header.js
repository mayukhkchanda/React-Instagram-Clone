import React from "react";
import "../css/SignedInHomepage/Header.css";
import { authenticator } from "../../firebase";
import { Link } from "react-router-dom";

function Header() {
  const signOut = () => {
    authenticator.signOut();
  };

  return (
    <div className="SignedInHomepage__header">
      <Link to="/">
        <img
          className="SignedInHomepage__logo"
          src={`${process.env.PUBLIC_URL}/assets/images/instagram-logo-header-small.png`}
          alt="ig-logo"
        />
      </Link>
      <button onClick={signOut} className="SignedInHomepage_auth-button">
        Log Out
      </button>
    </div>
  );
}

export default Header;
