"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Jumbotron/Hero";
import Schedule from "./components/Schedule/Schedule";
import BridalParty from "./components/BridalParty/BridalParty";
import RsvpModal from "./components/RsvpModal/RsvpModal";
import LocomotiveScroll from "locomotive-scroll";

export default function Home() {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  function handleOpenRsvpModal() {
    setIsRsvpModalOpen(true);
  }

  function handleCloseRsvpModal() {
    setIsRsvpModalOpen(false);
  }

  useEffect(() => {
    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        locomotiveScrollRef.current = new LocomotiveScroll(); // Store in ref
      } catch (error) {
        console.error("Failed to initialize Locomotive Scroll:", error);
      }
    };

    initScroll();

    // Cleanup function
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, []);

  // New useEffect for modal state
  useEffect(() => {
    if (isRsvpModalOpen) {
      // Stop locomotive scroll and prevent body scroll
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.stop(); // or .pause() depending on Locomotive Scroll API
      }
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable locomotive scroll and body scroll
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.start(); // or .play() depending on API
      }
      document.body.style.overflow = "";
    }
  }, [isRsvpModalOpen]);

  return (
    <div data-scroll data-scroll-container>
      <Navigation onRsvpClick={handleOpenRsvpModal} />
      {isRsvpModalOpen && <RsvpModal onClose={handleCloseRsvpModal} />}
      <main className={styles.main}>
        {/* Hero section */}
        <section id="home" data-scroll-section>
          <Hero />
        </section>
        <section id="schedule" className={styles.scheduleSection}>
          <Schedule />
        </section>
        <section
          id="bridalParty"
          className={styles.bridalPartySection}
          data-scroll-section
        >
          <BridalParty />
        </section>
        <section className={styles.faqSection}>Hello</section>
      </main>
    </div>
  );
}
