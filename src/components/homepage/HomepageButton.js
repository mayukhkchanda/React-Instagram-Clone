import React from "react";
import "../css/homepage/HomepageButton.css";

function HomepageButton() {
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className="rainbow-button"
    >
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/yT/r/vSKk5zscGX8.svg"
        className="image hover"
        alt=""
      />
      <img
        className="image "
        src="https://static.xx.fbcdn.net/rsrc.php/yZ/r/Sls_tmeuSGE.svg"
        alt=""
      />
      <span className="button-text">Business</span>
    </a>
  );
}

export default HomepageButton;
