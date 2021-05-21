import React from "react";
import "../css/SignedInHomepage/Header.css";
import { authenticator } from "../../firebase";

function Header() {
  const signOut = () => {
    authenticator.signOut();
  };

  return (
    <div className="SignedInHomepage__header">
      <img
        className="SignedInHomepage__logo"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="ig-logo"
      />
      <button onClick={signOut} className="SignedInHomepage_auth-button">
        Log Out
      </button>
    </div>
  );
}

export default Header;
