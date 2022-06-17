import React from "react";
import "./NoContent.scss";

const NoContent = (props) => {
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="d-flex justify-content-center align-content-center"
    >
      <h3 style={{ marginTop: "100px", color: "#4e4b4b" }}>{props.children}</h3>
    </div>
  );
};

export default NoContent;
