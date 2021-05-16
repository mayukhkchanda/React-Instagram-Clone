import React from "react";
import "../css/homepage/HomepageCommunity.css";
import HomepageButton from "./HomepageButton";

function HomepageCommunity() {
  return (
    <div data-scroll data-scroll-section id="scroll-fixed-target">
      <div data-scroll /* data-scroll-speed={-1} */>
        <div
          data-scroll
          style={{
            backgroundImage: `url("https://scontent.fccu3-1.fna.fbcdn.net/v/t39.8562-6/119776282_921551208250591_7504477318627411129_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=6825c5&_nc_ohc=0K5vgep-dcEAX9vAhcJ&_nc_ht=scontent.fccu3-1.fna&oh=df5f4d1234215feec88edc2ec131af9f&oe=60C4F0CE")`,
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
