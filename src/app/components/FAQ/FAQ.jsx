import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './FAQ.module.css';

gsap.registerPlugin(ScrollTrigger);

// FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const faqRefs = useRef([]);
  
  const faqs = [
    {
      question: "What time should I arrive?",
      answer: "Please arrive 15 minutes before the ceremony begins at 12:30 PM. This will give you time to find parking and get seated comfortably."
    },
    {
      question: "What is the dress code?",
      answer: "We're asking for cocktail attire. Think dressy but not overly formal - suits for men and cocktail dresses for women. Please avoid white, ivory, or anything too similar to the bride's dress."
    },
    {
      question: "Will the ceremony be outdoors?",
      answer: "The ceremony will be held outdoors in the garden, weather permitting. We have a beautiful indoor backup location in case of rain."
    },
    {
      question: "Are children welcome?",
      answer: "We love your little ones, but we've decided to keep our wedding an adults-only celebration. We hope you'll use this as an opportunity for a date night!"
    },
    {
      question: "Can I take photos during the ceremony?",
      answer: "We're having an unplugged ceremony - please keep phones and cameras away during the vows. Our photographer will capture everything! Feel free to snap away during the reception."
    },
    {
      question: "What about parking?",
      answer: "There's complimentary valet parking available at the venue. The valet stand will be clearly marked near the main entrance."
    },
    {
      question: "Will there be an open bar?",
      answer: "Yes! We'll have a full open bar during cocktail hour and dinner, featuring wine, beer, and signature cocktails. The bar will close at midnight."
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "Please let us know about any dietary restrictions when you RSVP. Our caterer can accommodate most allergies and dietary needs with advance notice."
    }
  ];

  // GSAP Animations
  useGSAP(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const faqItems = faqRefs.current;

    if (!container || !header) return;

    // Set initial states
    gsap.set(header.children, { opacity: 0, y: 50 });
    gsap.set(faqItems, { opacity: 0, x: -100, rotationY: -15 });

    // Create timeline for header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate header elements
    headerTl
      .to(header.children[0], { 
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

    // Animate FAQ items with stagger
    gsap.to(faqItems, {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 0.8,
      stagger: {
        amount: 1.2,
        from: "start"
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Parallax effect for the section
    gsap.to(container, {
      y: -50,
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
        if (trigger.trigger === container || 
            faqItems.some(item => item === trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={styles.faqSection}
    >
      <div 
        ref={headerRef}
        className={styles.header}
      >
        <h2 className={styles.title}>
          Frequently Asked Questions
        </h2>
        <p className={styles.subtitle}>
          We've answered some common questions below. If you have others, please don't hesitate to reach out!
        </p>
      </div>
      
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            index={index}
            ref={el => faqRefs.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
};

// Individual FAQ Item Component with forwardRef for GSAP animations
const FAQItem = React.forwardRef(({ question, answer, isOpen, onClick, index }, ref) => {
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  // GSAP animation for opening/closing
  useGSAP(() => {
    const content = contentRef.current;
    const icon = iconRef.current;
    
    if (!content || !icon) return;

    if (isOpen) {
      // Opening animation
      gsap.fromTo(content.children, 
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.1
        }
      );
      
      // Icon rotation and color change
      gsap.to(icon, {
        rotation: 45,
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      // Closing animation
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isOpen]);

  // Hover animations
  const handleMouseEnter = () => {
    if (!isOpen) {
      gsap.to(ref, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(iconRef.current, {
        scale: 1.1,
        rotation: 90,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      gsap.to(ref, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
    >
      <button
        ref={buttonRef}
        onClick={onClick}
        className={styles.faqButton}
      >
        <span className={styles.question}>{question}</span>
        <div 
          ref={iconRef}
          className={`${styles.iconContainer} ${isOpen ? styles.open : ''}`}
        >
          <span className={`${styles.icon} ${isOpen ? styles.open : ''}`}>
            +
          </span>
        </div>
      </button>
      
      <div 
        className={styles.contentContainer}
        style={{ height: `${height}px` }}
      >
        <div 
          ref={contentRef}
          className={styles.content}
        >
          <div className={styles.answer}>
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
});

export default FAQ;