import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>WorkHub Logo Maker</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Careers</span>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <div className="item">
            <h2>Support and Education</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on WorkHub</span>
            <span>Buying on WorkHub</span>
            <span>WorkHub Guides</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>WorkHub'</h2>
            <span>© WorkHub Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>

            <div className="link">
              <span>NPR</span>
            </div>
            {/* <img src="./img/accessibility.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
