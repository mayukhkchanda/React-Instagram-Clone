import React, { Component } from "react";
import "./css/Homepage.css";
import HomepageBanner from "../components/homepage/HomepageBanner";
import LocomotiveScroll from "locomotive-scroll";
import "../../node_modules/locomotive-scroll/dist/locomotive-scroll.css";
import HomepageCommunity from "../components/homepage/HomepageCommunity";
import HomepageHero from "../components/homepage/HomepageHero";
import HomepageHeader from "../components/homepage/HomepageHeader";

import HeroImages from "../utils/HeroImages.json";

class homepage extends Component {
  scrollContainerRef = React.createRef(null);

  /* componentDidMount() {
    this.scroll = new LocomotiveScroll({
      el: this.scrollContainerRef.current,
      smooth: true,
    });
  }

  componentWillUnmount() {
    this.scroll.destroy();
  } */

  renderHeros() {
    return HeroImages.map(
      ({ url, alt, showIcons, flipped, paraText, headerText, btnText }) => {
        return (
          <HomepageHero
            key={alt}
            url={url}
            alt={alt}
            paraText={paraText}
            headerText={headerText}
            btnText={btnText}
            showIcons={showIcons}
            flipped={flipped}
          />
        );
      }
    );
  }

  render() {
    return (
      <>
        <div
          data-scroll-container
          ref={this.scrollContainerRef}
          className="homepage"
        >
          <HomepageHeader />
          <HomepageBanner />
          <HomepageCommunity />
          {this.renderHeros()}
        </div>
      </>
    );
  }
}

export default homepage;
