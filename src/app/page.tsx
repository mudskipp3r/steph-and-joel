"use client";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Jumbotron/Hero";
import Calendar from "./components/Calendar/Calendar";
import RsvpCTA from './components/RsvpCTA/RsvpCTA'
import "./globals.css";

export default function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
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
