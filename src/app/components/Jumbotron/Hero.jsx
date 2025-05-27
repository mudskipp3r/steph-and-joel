import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Calendar from "../Calendar/Calendar";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const calendarRef = useRef(null);
  const backgroundRef = useRef(null);
  const foregroundRef = useRef(null);
  const semiCircleRef = useRef(null);

  useGSAP(() => {
    const hero = heroRef.current;
    const heroContent = heroContentRef.current;
    const calendar = calendarRef.current;
    const background = backgroundRef.current;
    const foreground = foregroundRef.current;
    const semiCircle = semiCircleRef.current;

    if (!hero) return;

    // Set initial states for entrance animations
    gsap.set([heroContent, calendar], { opacity: 0, y: 50 });

    // Hero content entrance animation
    const entranceTl = gsap.timeline({ delay: 0.5 });
    entranceTl.to([heroContent, calendar], {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
    });

    // Wait for entrance animation to complete before starting parallax
    entranceTl.call(() => {
      // Responsive parallax values with proper fallbacks
      const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 768;
      const isTablet =
        typeof window !== "undefined" && window.innerWidth <= 1024;

      // Adjust parallax intensity based on device with fallbacks
      const parallaxMultiplier = isMobile ? 0.3 : isTablet ? 0.6 : 1;

      // Parallax animations - start after entrance is complete
      if (heroContent) {
        gsap.to(heroContent, {
          y: -100 * parallaxMultiplier,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5 * parallaxMultiplier,
          },
        });
      }

      if (calendar) {
        gsap.to(calendar, {
          y: -150 * parallaxMultiplier,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8 * parallaxMultiplier,
          },
        });
      }

      if (background) {
        gsap.to(background, {
          y: -80 * parallaxMultiplier,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.3 * parallaxMultiplier,
          },
        });
      }

      if (foreground) {
        // Combined parallax Y movement with scale effect
        gsap.to(foreground, {
          y: -200 * parallaxMultiplier,
          scale: 0.8, // Scale down as we scroll - moving further away
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.0 * parallaxMultiplier,
          },
        });
      }

      if (semiCircle) {
        gsap.to(semiCircle, {
          y: -200 * parallaxMultiplier,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.2 * parallaxMultiplier,
          },
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === hero ||
          [heroContent, calendar, background, foreground, semiCircle].includes(
            trigger.trigger
          )
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        zIndex: 0,
      }}
    >
      {/* Hero Content Container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "clamp(30vh, 35vh, 60vh)",
          gap: "clamp(1rem, 4vw, 2rem)",
        }}
      >
        {/* Hero Text */}
        <div
          ref={heroContentRef}
          style={{
            width: "clamp(300px, 90vw, 640px)",
            maxWidth: "90vw",
            padding: "0 1rem",
            opacity: 0, // Add this
            transform: "translateY(50px)", // Add this
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              margin: "0 0 1rem 0",
            }}
          >
            Save the date
          </p>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              margin: 0,
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            Stephanie and Joel are getting married
          </h1>
        </div>

        {/* Calendar */}
        <div
          ref={calendarRef}
          style={{
            opacity: 0, // Add this
            transform: "translateY(50px)", // Add this
          }}
        >
          <Calendar />
        </div>
      </div>

      {/* Image Wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Container */}
        <div
          ref={backgroundRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "clamp(70vh, 80vh, 85vh)",
            zIndex: 1,
          }}
        >
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

        {/* Foreground Container with Scale Effect */}
        <div
          ref={foregroundRef}
          style={{
            position: "absolute",
            width: "clamp(150%, 200%, 250%)",
            bottom: "clamp(10vh, 15vh, 20vh)",
            height: "clamp(50vh, 70vh, 80vh)",
            zIndex: 3,
            pointerEvents: "none",
            transformOrigin: "center center", // Important for smooth scaling
          }}
        >
          <Image
            src="/images/foreground.png"
            width={1920}
            height={720}
            alt="Hero foreground elements"
            quality={85}
            sizes="250vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>

        {/* Semi Circle Transition */}
        <div
          ref={semiCircleRef}
          style={{
            position: "absolute",
            top: "clamp(65vh, 75vh, 80vh)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            width: "clamp(180%, 200%, 220%)",
            height: "clamp(400px, 700px, 900px)",
            backgroundColor: "#F5F0EB",
            borderTopLeftRadius: "100%",
            borderTopRightRadius: "100%",
            clipPath: "inset(0 0 50% 0)",
          }}
        />
      </div>
    </div>
  );
}
