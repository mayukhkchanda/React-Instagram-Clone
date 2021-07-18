import React from "react";
import "../css/homepage/HomepageButton.css";

/**component for rainbow button*/
function HomepageButton({ btnText }) {
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className="rainbow-button"
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/rainbow-button-image.svg`}
        className="image hover"
        alt=""
      />
      <img
        className="image "
        src={`${process.env.PUBLIC_URL}/assets/images/rainbow-button-image-border.svg`}
        alt=""
      />
      <span className="button-text">{btnText}</span>
    </a>
  );
}

export default HomepageButton;
