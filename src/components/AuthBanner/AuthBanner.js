import React from "react";
import "./AuthBanner.scss";
// import kanjiLabel from "../../assets/images/kanji-label.png";

const AuthBanner = () => {
  return (
    <div className="auth-banner">
      <div className="labelWrapper">
        <div className="label">
          <img src="" alt="" className="logo" />
        </div>
      </div>
      <p className="slogan">Commerce Project</p>
    </div>
  );
};

export default AuthBanner;
