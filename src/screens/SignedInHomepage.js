import React, { useEffect, useState } from "react";
import Header from "../components/SignedInHomepage/Header";
import Post from "../components/SignedInHomepage/Post";
import "./css/SignedInHomepage.css";
import FileUploadModal from "../components/SignedInHomepage/FileUploadModal";

import { fetchPosts } from "../actions";
import { connect } from "react-redux";
import Loader from "../components/global/Loader";

/**Page shown to the user on '/' route when user is signed in*/
function SignedInHomepage({ fetchPosts, posts }) {
  const [ModalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = () => {
    if (posts.length === 0) return <Loader />;

    return posts.map((post) => {
      return (
        <Post key={post.id} data={post.data} postId={post.id} isHomepage />
      );
    });
  };

  return (
    <div className={`SignedInHomepage ${ModalShow ? "no-scroll" : ""}`}>
      <Header />

      <div onClick={() => setModalShow(true)} className="ImageUpload">
        <div className="createPost--wrapper">
          <div className="createPost">
            <i className="fa fa-edit"></i>
            <span>Create a new post</span>
          </div>
        </div>
      </div>

      {ModalShow ? <FileUploadModal setModalShow={setModalShow} /> : null}

      <div className="SignedInHomepage__posts">{renderPosts()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { posts: Object.values(state.posts) };
};

export default connect(mapStateToProps, {
  fetchPosts,
})(SignedInHomepage);
