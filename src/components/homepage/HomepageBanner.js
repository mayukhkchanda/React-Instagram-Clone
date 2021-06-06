import React from "react";
import "../css/homepage/HomepageBanner.css";

const images = [
  { url: "winking-dog.jpg" },
  { url: "rainbow-sweater.jpg" },
  { url: "guy-on-bicycle.jpg" },
];

function HomepageBanner() {
  const renderImages = () => {
    return images.map(({ url }, index) => {
      return (
        <div key={url} className={`banner_image banner__image_${index + 1}`}>
          <img
            src={`/assets/images/${url}`}
            className="banner__image"
            alt={url.match(/^[A-Za-z-]+/)[0]}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div className="homepage__banner">
        <div className="banner__header--container">
          <h1 className="banner__header">
            Bringing you closer to the people and things you&nbsp;
            <span className="purple">
              <span className="hover-underline">love</span>
            </span>
          </h1>
        </div>
        <div className="banner__images--container">{renderImages()}</div>
      </div>
      <div className="white-block"></div>
    </>
  );
}

export default HomepageBanner;
