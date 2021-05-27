import React from "react";
import "../css/global/Loader.css";

function Loader() {
  return (
    <div className="spinner">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  );
}

export default Loader;
