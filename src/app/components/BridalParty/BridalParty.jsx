import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Individual Bridal Party Card Component
const BridalPartyCard = React.forwardRef(({ name, image, role, description, index }, ref) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const handleMouseEnter = () => {
    // Playful hover animation
    gsap.to(cardRef.current, {
      scale: 1.05,
      rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3 degrees
      duration: 0.4,
      ease: "back.out(1.7)"
    });

    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(contentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      delay: 0.1
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(contentRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transformOrigin: 'center center'
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          background: 'white',
          transformOrigin: 'center center'
        }}
      >
        {/* Image Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden'
        }}>
          <div ref={imageRef} style={{
            width: '100%',
            height: '100%',
            transformOrigin: 'center center'
          }}>
            <Image
              src={image}
              alt={name}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>

          {/* Hover Overlay */}
          <div
            ref={overlayRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
              opacity: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1.5rem'
            }}
          >
            <div
              ref={contentRef}
              style={{
                color: 'white',
                transform: 'translateY(20px)',
                opacity: 0
              }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: '0 0 0.25rem 0',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                {name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                margin: '0 0 0.5rem 0',
                color: '#f8c291',
                fontWeight: '500'
              }}>
                {role}
              </p>
              {description && (
                <p style={{
                  fontSize: '0.8rem',
                  margin: '0',
                  lineHeight: '1.3',
                  opacity: 0.9
                }}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div style={{
          padding: '1rem',
          textAlign: 'center',
          background: 'white'
        }}>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2c3e50',
            margin: '0',
            letterSpacing: '0.5px'
          }}>
            {name}
          </h4>
          <p style={{
            fontSize: '0.85rem',
            color: '#8e44ad',
            margin: '0.25rem 0 0 0',
            fontStyle: 'italic'
          }}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
});

// Main Bridal Party Component
const BridalParty = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  // Bridal party data
  const bridalPartyMembers = [
    {
      name: "Kat",
      image: "/images/bridalParty/1.jpg",
      role: "Maid of Honor",
      description: "Stephanie's best friend since college and partner in crime for all adventures."
    },
    {
      name: "Emma",
      image: "/images/bridalParty/2.jpg",
      role: "Bridesmaid",
      description: "The one who always knows how to make everyone laugh and feel at home."
    },
    {
      name: "Sarah",
      image: "/images/bridalParty/3.jpg",
      role: "Bridesmaid",
      description: "Stephanie's sister and the most caring person you'll ever meet."
    },
    {
      name: "Lucy",
      image: "/images/bridalParty/4.jpg",
      role: "Bridesmaid",
      description: "The voice of reason and the planner of the group."
    },
    {
      name: "Maya",
      image: "/images/bridalParty/5.jpg",
      role: "Bridesmaid",
      description: "Always up for spontaneous adventures and the life of any party."
    },
    {
      name: "Zoe",
      image: "/images/bridalParty/6.jpg",
      role: "Bridesmaid",
      description: "The creative soul who brings beauty and inspiration wherever she goes."
    },
    {
      name: "Anna",
      image: "/images/bridalParty/7.jpg",
      role: "Bridesmaid",
      description: "The loyal friend who's always there with a shoulder to lean on."
    }
  ];

  // GSAP Animations
  useGSAP(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current;

    if (!container || !header || !cardsContainer) return;

    // Set initial states
    gsap.set(header.children, { opacity: 0, y: 50 });
    gsap.set(cards, { 
      opacity: 0, 
      y: 40,
      rotation: () => Math.random() * 20 - 10, // Random initial rotation
      scale: 0.95
    });

    // Create entrance timeline
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Header animation
    entranceTl.to(header.children[0], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(header.children[1], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");

    // Cards cascade animation with random playful elements
    entranceTl.to(cards, {
      opacity: 1,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 0.5,
      stagger: {
        amount: 1.2,
        from: "start",
        ease: "power2.out"
      },
      ease: "power2.out"
    }, "-=0.3");

    // Add subtle floating animation for cards
    cards.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: Math.sin(index) * 1.5,
          duration: 6 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      }
    });

    // Subtle parallax for the whole section
    gsap.to(container, {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Section Header */}
      <div 
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '800px',
          margin: '0 auto 4rem auto'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: '700',
          color: '#2c3e50',
          margin: '0 0 1rem 0',
          letterSpacing: '-1px'
        }}>
          Meet the Bridal Party
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: '#666',
          lineHeight: '1.6',
          margin: '0',
          fontStyle: 'italic'
        }}>
          The amazing women who will be standing by Stephanie's side on her special day
        </p>
      </div>

      {/* Cards Grid */}
      <div 
        ref={cardsContainerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1rem'
        }}
      >
        {bridalPartyMembers.map((member, index) => (
          <BridalPartyCard
            key={index}
            ref={el => cardRefs.current[index] = el}
            name={member.name}
            image={member.image}
            role={member.role}
            description={member.description}
            index={index}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        opacity: 0.1,
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #f8c291, #e55a4e)',
        opacity: 0.1,
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default BridalParty;