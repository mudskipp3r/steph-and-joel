"use client";
import React, { useRef } from "react";
import "./BridalParty.css";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BridalPartyCard from "./BridalPartyCard";

gsap.registerPlugin(ScrollTrigger);

function BridalParty() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!container || !cardsContainer) return;

    // Use querySelectorAll to get all cards
    const cards = cardsContainer.querySelectorAll(".card");
    
    // Better distance calculation
    const distance = cardsContainer.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(cardsContainer, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        pinSpacer: false,
        scrub: true,
        start: "top top",
        end: "+=" + distance,
        markers: false, // Set to false for production
      },
    });

    cards.forEach((card) => {
      const values = {
        x: (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1),
        y: (Math.random() * 6 + 10) * (Math.random() < 0.5 ? 1 : -1),
        rotation: (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1),
      };

      gsap.fromTo(
        card,
        {
          rotation: values.rotation,
          xPercent: values.x,
          yPercent: values.y,
        },
        {
          rotation: -values.rotation,
          xPercent: -values.x,
          yPercent: -values.y,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 120%",
            end: "right -20%",
            scrub: true,
          },
        }
      );
    });

    // Cleanup function
    return () => {
      // Kill all ScrollTriggers associated with this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container || 
            cards.some(card => card === trigger.trigger)) {
          trigger.kill();
        }
      });
      
      // Alternative: kill all ScrollTriggers (if this is the only component using them)
      // ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="mwg_effect001">
      <p>Meet the bridal party</p>
      <div ref={containerRef} className="container">
        <div ref={cardsContainerRef} className="cards">
          <BridalPartyCard name="Kat" image="/images/bridalParty/1.jpg" info="" />
          <BridalPartyCard name="Emma" image="/images/bridalParty/2.jpg" info="" />
          <BridalPartyCard name="Sarah" image="/images/bridalParty/3.jpg" info="" />
          <BridalPartyCard name="Lucy" image="/images/bridalParty/4.jpg" info="" />
          <BridalPartyCard name="Maya" image="/images/bridalParty/5.jpg" info="" />
          <BridalPartyCard name="Zoe" image="/images/bridalParty/6.jpg" info="" />
          <BridalPartyCard name="Anna" image="/images/bridalParty/7.jpg" info="" />
        </div>
      </div>
    </div>
  );
}

export default BridalParty;