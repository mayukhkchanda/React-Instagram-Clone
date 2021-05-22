import React from "react";
import Header from "../components/SignedInHomepage/Header";
import Post from "../components/SignedInHomepage/Post";
import "./css/SignedInHomepage.css";

function SignedInHomepage() {
  return (
    <div className="SignedInHomepage">
      <Header />

      <div className="SignedInHomepage__posts">
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </div>

      {/**File Upload */}
    </div>
  );
}

export default SignedInHomepage;
