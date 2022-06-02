import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Footer.css";

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <h1>Coffee Berry</h1>
        <p className="footer-desc">
          We seek out compelling coffees and roast to eccentuate their unique
          qualities. Our coffee is an expression of our values: passion, care,
          respected integrity.
        </p>
        <div className="footer-social-container">
          <SocialIcon
            onClick={() =>
              window.open(
                "https://www.facebook.com/Coffee-Berry-%E1%83%99%E1%83%9D%E1%83%A4%E1%83%98-%E1%83%91%E1%83%94%E1%83%A0%E1%83%98-163616970984328",
                "_blank"
              )
            }
            color="3B5999"
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram
              onClick={() =>
                window.open(
                  "https://www.instagram.com/freshly_roasted_coffee_/",
                  "_blank"
                )
              }
            />
          </SocialIcon>
        </div>
      </div>
      <div className="footer-center">
        <h3 className="footer-title">Useful Links</h3>
        <ul className="footer-link-list">
          <li className="footer-link">
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Home
            </Link>
          </li>
          <li className="footer-link">
            <Link to="/cart" style={{ textDecoration: "none", color: "#000" }}>
              Cart
            </Link>
          </li>
          <li className="footer-link">
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              About us
            </Link>
          </li>
          <li className="footer-link">
            <Link
              to="/coffee"
              style={{ textDecoration: "none", color: "#000" }}
            >
              Coffee Shop
            </Link>
          </li>
          <li className="footer-link">
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-right-content-wrapper">
        <h3 className="footer-title">Contact</h3>
        <div className="footer-contact-item">
          <Room style={{ marginRight: "10px" }} /> 12 Digmis Masivi, Tbilisi,
          Georgia
        </div>
        <div className="footer-contact-item">
          <Phone style={{ marginRight: "10px" }} /> +995 599 08 08 31
        </div>
        <div className="footer-contact-item">
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          infocoffeeberry@yahoo.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
