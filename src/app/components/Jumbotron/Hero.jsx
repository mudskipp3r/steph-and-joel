import React from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import Calendar from "../Calendar/Calendar";

export default function Hero() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContentContainer}>
        <div data-scroll data-scroll-speed="0.1" className={styles.heroContent}>
          <p>Save the date</p>
          <h1>Stephanie and Joel are getting married</h1>
        </div>
        <div data-scroll data-scroll-speed="0.2">
          <Calendar />
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <div className={styles.backgroundContainer}>
          <Image
            src="/images/1920_1080.png"
            width={1920}
            height={1080}
            alt="Hero background"
            priority
            quality={85}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          data-scroll
          data-scroll-speed="0.2"
          className={styles.foregroundContainer}
        >
          <Image
            src="/images/foreground.png"
            width={1920}
            height={720}
            alt="Hero foreground elements"
            quality={85}
            sizes="200vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          data-scroll
          data-scroll-speed="0.3"
          className={styles.semiCircle}
        ></div>
      </div>
    </div>
  );
}
