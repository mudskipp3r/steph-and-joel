import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import styles from "./RsvpModal.module.css";

function RsvpModal({ onClose }) {
  const [modalLenis, setModalLenis] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    attendance: '',
    plusOne: false,
    plusOneName: '',
    mealPreference: '',
    plusOneMeal: '',
    dietaryRestrictions: '',
    songRequest: '',
    specialAccommodations: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    // Create a non-root Lenis instance for the modal content
    const modalLenisInstance = new Lenis({
      wrapper: document.querySelector('[data-rsvp-modal-content]'),
      content: document.querySelector('[data-rsvp-modal-scroll]'),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setModalLenis(modalLenisInstance);

    // Listen for scroll events to update progress
    modalLenisInstance.on('scroll', (e) => {
      const progress = e.progress || 0;
      setScrollProgress(progress);
    });

    // Add to GSAP ticker
    gsap.ticker.add((time) => {
      modalLenisInstance.raf(time * 1000);
    });

    // Cleanup
    return () => {
      modalLenisInstance.destroy();
      gsap.ticker.remove((time) => {
        modalLenisInstance.raf(time * 1000);
      });
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContainer} 
        onClick={(e) => e.stopPropagation()}
        data-rsvp-modal-content
      >
        <div className={styles.modalContent} data-rsvp-modal-scroll>
          <div className={styles.modalHeader}>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>

          <div className={styles.rsvpForm} netlify="true">
            <div className={styles.formHeader}>
              <h2>RSVP to Sarah & Michael's Wedding</h2>
              <p>We're so excited to celebrate with you! Please fill out this form by May 15th, 2024.</p>
            </div>

            <form 
              name="wedding-rsvp" 
              method="POST" 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              className={styles.form}
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="wedding-rsvp" />
              <p style={{ display: 'none' }}>
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </p>

              {/* Guest Information */}
              <section className={styles.section}>
                <h3>Guest Information</h3>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="guestName">Full Name *</label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </section>

              {/* Attendance */}
              <section className={styles.section}>
                <h3>Will you be attending? *</h3>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === 'yes'}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Yes, I'll be there! 🎉</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === 'no'}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Sorry, I can't make it 😢</span>
                  </label>
                </div>
              </section>

              {/* Plus One */}
              <section className={styles.section}>
                <h3>Plus One</h3>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="plusOne"
                      checked={formData.plusOne}
                      onChange={handleInputChange}
                      value="yes"
                    />
                    <span>I'll be bringing a plus one</span>
                  </label>
                </div>

                {formData.plusOne && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="plusOneName">Plus One's Full Name</label>
                    <input
                      type="text"
                      id="plusOneName"
                      name="plusOneName"
                      value={formData.plusOneName}
                      onChange={handleInputChange}
                      placeholder="Enter your plus one's full name"
                    />
                  </div>
                )}
              </section>

              {/* Meal Preferences - Only show if attending */}
              {formData.attendance === 'yes' && (
                <section className={styles.section}>
                  <h3>Meal Preferences</h3>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="mealPreference">Your Meal Choice *</label>
                    <select
                      id="mealPreference"
                      name="mealPreference"
                      value={formData.mealPreference}
                      onChange={handleInputChange}
                      required={formData.attendance === 'yes'}
                    >
                      <option value="">Please select...</option>
                      <option value="beef">Herb-Crusted Beef Tenderloin</option>
                      <option value="chicken">Lemon Herb Roasted Chicken</option>
                      <option value="salmon">Pan-Seared Salmon</option>
                      <option value="vegetarian">Vegetarian Pasta Primavera</option>
                      <option value="vegan">Vegan Mediterranean Bowl</option>
                    </select>
                  </div>

                  {formData.plusOne && (
                    <div className={styles.inputGroup}>
                      <label htmlFor="plusOneMeal">Plus One's Meal Choice</label>
                      <select
                        id="plusOneMeal"
                        name="plusOneMeal"
                        value={formData.plusOneMeal}
                        onChange={handleInputChange}
                      >
                        <option value="">Please select...</option>
                        <option value="beef">Herb-Crusted Beef Tenderloin</option>
                        <option value="chicken">Lemon Herb Roasted Chicken</option>
                        <option value="salmon">Pan-Seared Salmon</option>
                        <option value="vegetarian">Vegetarian Pasta Primavera</option>
                        <option value="vegan">Vegan Mediterranean Bowl</option>
                      </select>
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</label>
                    <textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      placeholder="Please let us know about any dietary restrictions, allergies, or special requirements..."
                      rows="3"
                    />
                  </div>
                </section>
              )}

              {/* Additional Information */}
              <section className={styles.section}>
                <h3>Additional Information</h3>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="songRequest">Song Request</label>
                  <input
                    type="text"
                    id="songRequest"
                    name="songRequest"
                    value={formData.songRequest}
                    onChange={handleInputChange}
                    placeholder="Any special song you'd love to hear at the reception?"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="specialAccommodations">Special Accommodations</label>
                  <textarea
                    id="specialAccommodations"
                    name="specialAccommodations"
                    value={formData.specialAccommodations}
                    onChange={handleInputChange}
                    placeholder="Do you need any special accommodations for the venue or ceremony?"
                    rows="3"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message for the Couple</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Leave a sweet message for Sarah & Michael!"
                    rows="4"
                  />
                </div>
              </section>

              <div className={styles.submitSection}>
                <button type="submit" className={styles.submitButton}>
                  Submit RSVP
                </button>
                <p className={styles.submitNote}>
                  Thank you for taking the time to RSVP! We'll send a confirmation email shortly.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RsvpModal;