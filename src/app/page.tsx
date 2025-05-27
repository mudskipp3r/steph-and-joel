"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Jumbotron/Hero";
import Schedule from "./components/Schedule/Schedule";
import RsvpModal from "./components/RsvpModal/RsvpModal";
import FAQ from './components/FAQ/FAQ'
import BridalParty from './components/BridalParty/BridalParty'

export default function Home() {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

  function handleOpenRsvpModal() {
    setIsRsvpModalOpen(true);
  }

  function handleCloseRsvpModal() {
    setIsRsvpModalOpen(false);
  }

  // Simple body scroll lock for modal
  useEffect(() => {
    if (isRsvpModalOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = "";
    }

    // Cleanup function to ensure scroll is re-enabled
    return () => {
      document.body.style.overflow = "";
    };
  }, [isRsvpModalOpen]);

  return (
    <div>
      <Navigation onRsvpClick={handleOpenRsvpModal} />
      {isRsvpModalOpen && <RsvpModal onClose={handleCloseRsvpModal} />}
      <main className={styles.main}>
        {/* Hero section */}
        <section id="home">
          <Hero />
        </section>
        <section id="schedule" className={styles.scheduleSection}>
          <Schedule />
        </section>
        <section
          id="bridalparty"
          className={styles.bridalPartySection}
        >
          <BridalParty />
        </section>
        <section id="faq" className={styles.faqSection}>
          <FAQ />
        </section>
      </main>
    </div>
  );
}