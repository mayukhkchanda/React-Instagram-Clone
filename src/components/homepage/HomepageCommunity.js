import React from "react";
import "../css/homepage/HomepageCommunity.css";
import HomepageButton from "./HomepageButton";

function HomepageCommunity() {
  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/assets/images/background-attachment-image.jpg")`,
            height: "100vh",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "50%",
            opacity: "1",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="community-text">
            <p className="community-para">ALL ARE WELCOME</p>
            <h2 className="community-header">
              We're committed to fostering a safe and supportive community for
              everyone.
            </h2>
            <HomepageButton btnText="Community" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageCommunity;
