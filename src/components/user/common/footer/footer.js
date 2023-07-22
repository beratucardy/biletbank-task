import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import footerLogo from "../../../../assets/img/logo/footer-logo.png";
import tursabLogo from "../../../../assets/img/logo/tursab-logo.png";
import iataLogo from "../../../../assets/img/logo/iata-logo.png";
import { settings } from "../../../../helpers/settings";
import { VscLocation } from "react-icons/vsc";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TiMail } from "react-icons/ti";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <Container>
          <Row className="gy-3">
            <Col lg={4}>
              <img src={footerLogo} alt={settings.siteName} />
            </Col>
            <Col lg={4}>
              <ul>
                <li>
                  <VscLocation />
                  <p>
                    Çobançeşme Mah. Sanayi Cad. No:44 Nish İstanbul C Blok
                    Kat:17 D: 197-200 Yenibosna, Bahçelievler, İstanbul, Türkiye
                  </p>
                </li>
                <li>
                  <BsFillTelephoneFill />
                  <a href="tel:+90 850 222 08 30">+90 850 222 08 30</a>
                </li>
                <li>
                  <TiMail />
                  <a href="mailto:info@petour.com">info@petour.com</a>
                </li>
              </ul>
            </Col>
            <Col lg={2}>
              <img src={tursabLogo} alt="tursab" />
            </Col>
            <Col lg={2}>
              <img src={iataLogo} alt="iata" />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <div className="footer-bottom-f">
            <p>
              © Copyright 2023 Akdeniz PE-TUR A.Ş. |{" "}
              <a
                href="https://www.belgemodul.com/sirket/1383"
                target="_blank"
                rel="noreferrer"
              >
                Bilgi Toplumu Merkezi
              </a>
            </p>
            <div>
              <a
                href="https://www.facebook.com/biletbankcom"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/biletbank/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.twitter.com/biletbankcom"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/biletbankcom/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
