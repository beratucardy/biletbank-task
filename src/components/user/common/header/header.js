import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../../assets/img/logo/logo.png";
import { settings } from "../../../../helpers/settings";
import { Button, NavDropdown } from "react-bootstrap/esm";
import { Link, useLocation } from "react-router-dom";
import {
  $t,
  getCurrentLang,
  setCurrentLang,
} from "../../../../helpers/locale-helper";
import "./header.scss";

const Header = () => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [breakpoint2, setBreakpoint2] = useState(true);
  const currentLang = getCurrentLang();
  const { pathname } = useLocation();

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    if (screenSize.width < 1200) {
      setBreakpoint2(false);
    } else if (screenSize.width > 1200) {
      setBreakpoint2(true);
    }
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize, currentLang]);

  return (
    <Container className="header">
      <Navbar bg="white" expand="xl">
        <Container fluid>
          <Navbar.Brand
            href="/"
            title={currentLang.code === "TR" ? "AnaSayfa" : "HomePage"}
          >
            <img src={logo} alt={settings.siteName} className="img-fluid" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto ms-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link
                href="/"
                title={currentLang.code === "TR" ? "AnaSayfa" : "HomePage"}
                active={pathname === "/"}
              >
                {$t("home")}
              </Nav.Link>
              <NavDropdown
                title={$t("corporate")}
                id="basic-nav-dropdown"
                renderMenuOnMount={breakpoint2 ? true : false}
              >
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/kurumsal/kurum-profili/"
                      : "https://www.biletbank.com/en/corporate/corporate-profile/"
                  }
                  target="_blank"
                >
                  {$t("corporateProfile")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/kurumsal/tarihce/"
                      : "https://www.biletbank.com/en/corporate/brief-history/"
                  }
                  target="_blank"
                >
                  {$t("briefHistory")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/kurumsal/haberler-ve-duyurular/"
                      : "https://www.biletbank.com/en/corporate/news-and-announcements/"
                  }
                  target="_blank"
                >
                  {$t("newsAndAnnouncements")}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={$t("products")}
                id="basic-nav-dropdown"
                renderMenuOnMount={breakpoint2 ? true : false}
              >
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/urunler/biletbank-b2b/"
                      : "https://www.biletbank.com/en/products/biletbank-b2b/"
                  }
                  target="_blank"
                >
                  BiletBank B2B
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/urunler/bbost-api/"
                      : "https://www.biletbank.com/en/products/bbost-api/"
                  }
                  target="_blank"
                >
                  BBost API
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href={
                  currentLang.code === "TR"
                    ? "https://www.biletbank.com/hizmetler/"
                    : "https://www.biletbank.com/en/services/"
                }
                target="_blank"
                title={currentLang.code === "TR" ? "Hizmetler" : "Services"}
              >
                {$t("services")}
              </Nav.Link>
              <NavDropdown
                title={$t("rdCenter")}
                id="basic-nav-dropdown"
                renderMenuOnMount={breakpoint2 ? true : false}
              >
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/ar-ge-merkezi/tanitim/"
                      : "https://www.biletbank.com/en/rd-center/about/"
                  }
                  target="_blank"
                >
                  {$t("about")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    currentLang.code === "TR"
                      ? "https://www.biletbank.com/ar-ge-merkezi/akademik-calismalar/"
                      : "https://www.biletbank.com/en/rd-center/academic-studies/"
                  }
                  target="_blank"
                >
                  {$t("academicStudies")}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href={
                  currentLang.code === "TR"
                    ? "https://www.biletbank.com/kariyer/"
                    : "https://www.biletbank.com/en/careers/"
                }
                target="_blank"
                title={currentLang.code === "TR" ? "Kariyer" : "Careers"}
              >
                {$t("careers")}
              </Nav.Link>
              <Nav.Link
                href={
                  currentLang.code === "TR"
                    ? "https://www.biletbank.com/iletisim/"
                    : "https://www.biletbank.com/en/contact-us/"
                }
                target="_blank"
                title={currentLang.code === "TR" ? "Iletisim" : "Contact"}
              >
                {$t("contact")}
              </Nav.Link>
              <div className="d-xl-block d-none divider">&nbsp;</div>
              <Nav.Link
                title={currentLang.code === "TR" ? "TR" : "EN"}
                onClick={
                  currentLang.code === "TR"
                    ? () =>
                        setCurrentLang({
                          title: "English",
                          code: "EN",
                          country: "gb",
                        })
                    : () =>
                        setCurrentLang({
                          title: "Türkçe",
                          code: "TR",
                          country: "tr",
                        })
                }
                className="lang"
              >
                {currentLang.code === "TR" ? "EN" : "TR"}
              </Nav.Link>
              <div className="auth">
                <Button
                  as={Link}
                  to={currentLang.code === "TR" ? "/kayit" : "/register"}
                >
                  {/* bu kısımda sizin sitenize yönlendirme yapmadım hazırladığım not found sayfasını göstermek için */}
                  {$t("register")}
                </Button>
                <Button
                  as={Link}
                  to={currentLang.code === "TR" ? "/giris" : "/login"}
                >
                  {/* bu kısımda sizin sitenize yönlendirme yapmadım hazırladığım not found sayfasını göstermek için */}
                  {$t("login")}
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
