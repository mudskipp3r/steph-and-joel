"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Jumbotron/Hero";
import "./globals.css";

export default function Home() {
  useEffect(() => {
    let locomotiveScroll: { destroy: () => void } | null = null;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        locomotiveScroll = new LocomotiveScroll();
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
      }
    };

    initScroll();

    // Cleanup function
    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return (
    <div data-scroll data-scroll-container>
      <Navigation />
      <main className={styles.main}>
        {/* Hero section */}
        <section id="home" data-scroll-section>
          <Hero />
        </section>
        <section id="schedule" className={styles.scheduleSection}>
          <h1>Schedule</h1>
        </section>
      </main>
    </div>
  );
}
