import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import styles from "./RsvpModal.module.css";

function RsvpModal({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [modalLenis, setModalLenis] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [plusOneEnabled, setPlusOneEnabled] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPromoField, setShowPromoField] = useState(false);

  const handlePlusOneChange = (e) => {
    const isChecked = e.target.checked;
    setShowPromoField(isChecked);

    // Reset promo code state when unchecking
    if (!isChecked) {
      setPromoCode("");
      setPlusOneEnabled(false);
      setPromoCodeError("");
    }
  };

  const verifyPromoCode = async (code) => {
    if (!code.trim()) {
      setPlusOneEnabled(false);
      setPromoCodeError("");
      return;
    }

    setIsVerifying(true);
    setPromoCodeError("");

    try {
      const response = await fetch("/.netlify/functions/verify-promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promoCode: code }),
      });

      const result = await response.json();

      if (result.valid) {
        setPlusOneEnabled(true);
        setPromoCodeError("");
      } else {
        setPlusOneEnabled(false);
        setPromoCodeError("Invalid promo code");
      }
    } catch (error) {
      setPlusOneEnabled(false);
      setPromoCodeError("Error verifying code");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePromoCodeChange = (e) => {
    const code = e.target.value;
    setPromoCode(code);

    // Reset states when user types
    setPlusOneEnabled(false);
    setPromoCodeError("");
  };

  const handleVerifyClick = () => {
    verifyPromoCode(promoCode);
  };

  useEffect(() => {
    // Create a non-root Lenis instance for the modal content
    const modalLenisInstance = new Lenis({
      wrapper: document.querySelector("[data-rsvp-modal-content]"),
      content: document.querySelector("[data-rsvp-modal-scroll]"),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setModalLenis(modalLenisInstance);

    // Listen for scroll events to update progress
    modalLenisInstance.on("scroll", (e) => {
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
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>

          <div className={styles.rsvpForm}>
            <div className={styles.formHeader}>
              <h2>RSVP to Sarah & Michael's Wedding</h2>
              <p>
                We're so excited to celebrate with you! Please fill out this
                form by May 15th, 2024.
              </p>
            </div>

            <form
              name="wedding-rsvp"
              method="POST"
              action="/thank-you"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className={styles.form}
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitError("");

                try {
                  const form = e.target;
                  const response = await fetch("/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(new FormData(form)).toString(),
                  });

                  if (response.ok) {
                    setIsSubmitted(true);
                  } else {
                    throw new Error("Form submission failed");
                  }
                } catch (error) {
                  setSubmitError(
                    "There was an error submitting your RSVP. Please try again."
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="wedding-rsvp" />
              <p style={{ display: "none" }}>
                <label>
                  Don't fill this out if you're human:{" "}
                  <input name="bot-field" />
                </label>
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
                      required
                    />
                    <span>Yes, I'll be there! 🎉</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="attendance" value="no" required />
                    <span>Sorry, I can't make it 😢</span>
                  </label>
                </div>
              </section>

              {/* Plus One */}
              <section className={styles.section}>
                <h3>Plus One</h3>

                {/* Plus One Checkbox - Always visible */}
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="plusOneIntent"
                      onChange={handlePlusOneChange}
                    />
                    <span>I'll be bringing a plus one</span>
                  </label>
                </div>

                {/* Promo Code Input - Only show when checkbox is checked */}
                {showPromoField && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="promoCode">
                      Plus One Access Code
                      <span className={styles.helpText}>
                        (required to bring a plus one)
                      </span>
                    </label>
                    <div className={styles.promoCodeContainer}>
                      <input
                        type="text"
                        id="promoCode"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        placeholder="Enter your plus one access code"
                        className={`${styles.promoCodeInput} ${
                          promoCodeError ? styles.error : ""
                        } ${plusOneEnabled ? styles.success : ""}`}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyClick}
                        disabled={!promoCode.trim() || isVerifying}
                        className={styles.verifyButton}
                      >
                        {isVerifying ? "Verifying..." : "Verify"}
                      </button>
                    </div>
                    {promoCodeError && (
                      <span className={styles.errorText}>{promoCodeError}</span>
                    )}
                    {plusOneEnabled && (
                      <span className={styles.successText}>
                        ✓ Plus one access granted!
                      </span>
                    )}
                  </div>
                )}

                {/* Plus One Name - Only show when promo code is valid */}
                {plusOneEnabled && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="plusOneName">Plus One's Full Name</label>
                    <input
                      type="text"
                      id="plusOneName"
                      name="plusOneName"
                      placeholder="Enter your plus one's full name"
                    />
                    {/* Hidden field to actually submit plus one status */}
                    <input type="hidden" name="plusOne" value="yes" />
                  </div>
                )}
              </section>

              {/* Meal Preferences */}
              <section className={styles.section}>
                <h3>Meal Preferences</h3>

                <div className={styles.inputGroup}>
                  <label htmlFor="mealPreference">Your Meal Choice</label>
                  <select id="mealPreference" name="mealPreference">
                    <option value="">Please select...</option>
                    <option value="beef">Herb-Crusted Beef Tenderloin</option>
                    <option value="chicken">Lemon Herb Roasted Chicken</option>
                    <option value="salmon">Pan-Seared Salmon</option>
                    <option value="vegetarian">
                      Vegetarian Pasta Primavera
                    </option>
                    <option value="vegan">Vegan Mediterranean Bowl</option>
                  </select>
                </div>

                {/* Plus One Meal - Only show when plus one is enabled */}
                {plusOneEnabled && (
                  <div className={styles.inputGroup}>
                    <label htmlFor="plusOneMeal">Plus One's Meal Choice</label>
                    <select id="plusOneMeal" name="plusOneMeal">
                      <option value="">Please select...</option>
                      <option value="beef">Herb-Crusted Beef Tenderloin</option>
                      <option value="chicken">
                        Lemon Herb Roasted Chicken
                      </option>
                      <option value="salmon">Pan-Seared Salmon</option>
                      <option value="vegetarian">
                        Vegetarian Pasta Primavera
                      </option>
                      <option value="vegan">Vegan Mediterranean Bowl</option>
                    </select>
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <label htmlFor="dietaryRestrictions">
                    Dietary Restrictions or Allergies
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    placeholder="Please let us know about any dietary restrictions, allergies, or special requirements..."
                    rows="3"
                  />
                </div>
              </section>

              {/* Additional Information */}
              <section className={styles.section}>
                <h3>Additional Information</h3>

                <div className={styles.inputGroup}>
                  <label htmlFor="songRequest">Song Request</label>
                  <input
                    type="text"
                    id="songRequest"
                    name="songRequest"
                    placeholder="Any special song you'd love to hear at the reception?"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="specialAccommodations">
                    Special Accommodations
                  </label>
                  <textarea
                    id="specialAccommodations"
                    name="specialAccommodations"
                    placeholder="Do you need any special accommodations for the venue or ceremony?"
                    rows="3"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message for the Couple</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Leave a sweet message for Sarah & Michael!"
                    rows="4"
                  />
                </div>
              </section>

              <div className={styles.submitSection}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit RSVP"
                  )}
                </button>
                <p className={styles.submitNote}>
                  Thank you for taking the time to RSVP! We'll send a
                  confirmation email shortly.
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
