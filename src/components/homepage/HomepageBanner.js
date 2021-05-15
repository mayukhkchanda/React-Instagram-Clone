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
        <div key={url} class={`banner__image_${index + 1}`}>
          <img
            src={`/assets/images/${url}`}
            class="banner__image"
            alt={url.match(/^[A-Za-z-]+/)[0]}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div class="homepage__banner">
        <div class="banner__header--container">
          <h1 class="banner__header">
            Bringing you closer to the people and things you&nbsp;
            <span class="purple">
              <span class="hover-underline">love</span>
            </span>
          </h1>
        </div>
        <div class="banner__images--container">{renderImages()}</div>
      </div>
      <div class="white-block"></div>
    </>
  );
}

export default HomepageBanner;
