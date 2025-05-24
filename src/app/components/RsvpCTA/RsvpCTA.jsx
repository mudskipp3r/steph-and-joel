import React from "react";
import "./styles.css";
import PrimaryButton from "../Button/PrimaryButton";

function RsvpCTA() {
  return (
    <div
      data-scroll
      data-scroll-speed="0.2"
      data-scroll-repeat="true"
      data-scroll-class="scroll-reveal"
      className="container"
    >
      <h1>Let us know if you can make it</h1>
      <PrimaryButton>RSVP</PrimaryButton>
    </div>
  );
}

export default RsvpCTA;
