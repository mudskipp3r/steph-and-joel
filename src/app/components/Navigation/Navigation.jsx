import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import OutlineButton from "../Button/OutlineButton";

gsap.registerPlugin(ScrollToPlugin);

function Navigation({ onRsvpClick }) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolledUpFromBottom, setScrolledUpFromBottom] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isHidden.current) {
        gsap.to(navRef.current, { y: "-100%", duration: 0.3, ease: "power2.out" });
        isHidden.current = true;
        setScrolledUpFromBottom(false);
      } else if ((currentScrollY < lastScrollY.current || currentScrollY <= 10) && isHidden.current) {
        gsap.to(navRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
        isHidden.current = false;
      }
      setScrolledUpFromBottom(currentScrollY > 100);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false); // Close menu on nav click (for mobile)
    gsap.to(window, { duration: 1, scrollTo: `#${id}`, ease: "power2.out" });
  };

  const wrapperStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    paddingLeft: 24,
    zIndex: 999,
    flexWrap: "wrap",
    transform: "translateY(0%)",
    backgroundColor: scrolledUpFromBottom ? "#fff" : "transparent",
    transition: "background-color 0.3s ease"
  };

  const navListStyle = {
    display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    width: isMobile ? "100%" : "auto",
    marginTop: isMobile ? 8 : 0,
  };

  const navItemStyle = {
    listStyle: "none",
    alignSelf: "center",
  };

  const hamburgerStyle = {
    display: isMobile ? "block" : "none",
    cursor: "pointer",
    fontSize: 24,
    background: "none",
    border: "none"
  };

  return (
    <div
      ref={navRef}
      style={wrapperStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <a href="#home" onClick={e => { e.preventDefault(); scrollToSection('home'); }}>
          <strong>Stephanie</strong>and<strong>Joel</strong>
        </a>
      </div>

      <button style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div style={navListStyle}>
        <ul style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, padding: 0, margin: 0 }}>
          <li style={navItemStyle}>
            <a
              href="#schedule"
              onClick={e => { e.preventDefault(); scrollToSection('schedule'); }}
              style={{
                textDecoration: "none",
                color: "#000",
                transition: "transform 0.2s ease, color 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Wedding schedule
            </a>
          </li>
          <li style={navItemStyle}>
            <a
              href="#bridalparty"
              onClick={e => { e.preventDefault(); scrollToSection('bridalparty'); }}
              style={{
                textDecoration: "none",
                color: "#000",
                transition: "transform 0.2s ease, color 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Bridal party
            </a>
          </li>
          <li style={navItemStyle}>
            <a
              href="#faq"
              onClick={e => { e.preventDefault(); scrollToSection('faq'); }}
              style={{
                textDecoration: "none",
                color: "#000",
                transition: "transform 0.2s ease, color 0.2s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              FAQ
            </a>
          </li>
          <li style={navItemStyle}>
            <OutlineButton onClick={onRsvpClick}>RSVP</OutlineButton>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;