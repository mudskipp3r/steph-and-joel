import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Calendar-Style Event Card Component
const EventCard = React.forwardRef(({ title, attendees, time, locationName, address, eventLink, index, isMainEvent = false }, ref) => {
  const cardRef = useRef(null);
  const timeRef = useRef(null);

  // Parse time for display
  const timeDisplay = time.split(' ');
  const timeNumber = timeDisplay[0];
  const ampm = timeDisplay[1];

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(timeRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(timeRef.current, {
      scale: 1,
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
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '0',
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        cursor: 'pointer',
        overflow: 'hidden',
        border: isMainEvent ? '3px solid #667eea' : '1px solid rgba(0,0,0,0.05)',
        transform: 'translateY(0)',
        transition: 'border-color 0.3s ease'
      }}
    >
      <div ref={cardRef} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        minHeight: '140px'
      }}>
        {/* Time Section - Calendar Style */}
        <div 
          ref={timeRef}
          style={{
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: isMainEvent 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            color: isMainEvent ? 'white' : '#2c3e50',
            borderRadius: '1rem 0 0 1rem'
          }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: '0',
            lineHeight: '1'
          }}>
            {timeNumber}
          </h2>
          <p style={{
            fontSize: '1rem',
            margin: '0',
            opacity: 0.8,
            fontWeight: '500'
          }}>
            {ampm}
          </p>
          {isMainEvent && (
            <div style={{
              width: '30px',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.5)',
              margin: '0.5rem 0',
              borderRadius: '1px'
            }} />
          )}
        </div>

        {/* Event Details */}
        <div style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '600',
            color: '#2c3e50',
            margin: '0 0 0.5rem 0'
          }}>
            {title}
          </h3>
          
          <p style={{
            color: '#8e44ad',
            fontSize: '0.9rem',
            fontStyle: 'italic',
            margin: '0 0 0.75rem 0'
          }}>
            {attendees}
          </p>
          
          <div style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '0.75rem'
          }}>
            <p style={{
              fontWeight: '600',
              color: '#2c3e50',
              fontSize: '0.95rem',
              margin: '0 0 0.25rem 0'
            }}>
              {locationName}
            </p>
            <p style={{
              color: '#666',
              fontSize: '0.85rem',
              lineHeight: '1.3',
              margin: '0'
            }}>
              {address}
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Strip */}
      <div style={{
        padding: '1rem 1.5rem',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'flex-end'
      }}>
        <button style={{
          padding: '0.4rem 0.8rem',
          fontSize: '0.8rem',
          fontWeight: '500',
          border: '1px solid #dee2e6',
          backgroundColor: 'white',
          color: '#495057',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}>
          📍 View Map
        </button>
        <button style={{
          padding: '0.4rem 0.8rem',
          fontSize: '0.8rem',
          fontWeight: '500',
          border: '1px solid #667eea',
          backgroundColor: '#667eea',
          color: 'white',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}>
          📅 Add to Calendar
        </button>
      </div>
    </div>
  );
});

// Main Schedule Component
const Schedule = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const eventCardsRef = useRef([]);

  const events = [
    {
      title: "Tea Ceremony",
      attendees: "Immediate family only",
      time: "6:30 AM",
      locationName: "Stephanie's House",
      address: "6 Orchard Street, Epping NSW, 2021",
      eventLink: "#",
      isMainEvent: false
    },
    {
      title: "Wedding Ceremony",
      attendees: "All wedding guests",
      time: "12:30 PM",
      locationName: "Saint Brigids Marrickville",
      address: "392 Marrickville Rd, Marrickville NSW 2204",
      eventLink: "#",
      isMainEvent: true
    },
    {
      title: "Reception & Celebration",
      attendees: "All wedding guests",
      time: "6:30 PM",
      locationName: "The Sky Ballroom",
      address: "Level 3/462 Chapel Rd, Bankstown NSW 2200",
      eventLink: "#",
      isMainEvent: false
    }
  ];

  // GSAP Animations
  useGSAP(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const eventCards = eventCardsRef.current;

    if (!container || !header) return;

    // Set initial states
    gsap.set(header.children, { opacity: 0, y: 50 });
    gsap.set(eventCards, { opacity: 0, y: 80, scale: 0.9 });

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Header entrance
    tl.to(header.children[0], {
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
    }, "-=0.4")
    
    // Event cards cascade in
    .to(eventCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: "start"
      },
      ease: "power3.out"
    }, "-=0.2");

    // Subtle parallax
    gsap.to(container, {
      y: -40,
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
        maxWidth: '900px',
        margin: '0 auto',
        padding: '6rem 2rem',
        backgroundColor: '#F5F0EB',
      }}
    >
      {/* Section Header */}
      <div 
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}
      >
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#2c3e50',
          margin: '0 0 1rem 0'
        }}>
          Wedding Day Timeline
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          Join us throughout the day as we celebrate love, family, and new beginnings
        </p>
      </div>

      {/* Event Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            ref={el => eventCardsRef.current[index] = el}
            title={event.title}
            attendees={event.attendees}
            time={event.time}
            locationName={event.locationName}
            address={event.address}
            eventLink={event.eventLink}
            index={index}
            isMainEvent={event.isMainEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default Schedule;