import React from "react";
import "./Footer.scss";

import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const infoLinks = [
    { id: 0, name: "Contact Us", to: "/contact" },
    { id: 1, name: "Sell With Us", to: "/sell" },
    { id: 2, name: "Shipping", to: "/shipping" }
  ];

  const footerLinks = infoLinks.map((item) => (
    <li key={item.id} className="footer-link">
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-content-block">
            <div className="block-title">
              <h2>Customer Service</h2>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className="footer-content-block">
            <div className="block-title">
              <h2>Our Information</h2>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className="footer-content-block">
            <div className="block-title">
              <h2>Follow Us</h2>
            </div>
            <div className="block-content">
              <ul>{footerLinks}</ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright d-flex justify-content-center">
          <span>Ecommerce Store</span>
        </div>
        <ul className="footer-social">
          <li>
            <Link to="/facebook" target="_blank">
              <span className="  social-icon facebook-icon"></span>
            </Link>
          </li>
          <li>
            <Link to="/instagram" target="_blank">
              <span className=" social-icon instagram-icon"></span>
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
