import React from "react";
import "../App.css";

const PageNotFound = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-center">
          <img
            src={require("../images/pagenotfound.png")}
            className="pnf-img"
          ></img>
        </div>
      </div>
    </>
  );
};
export default PageNotFound;
