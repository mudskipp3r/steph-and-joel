import React from "react";
import styles from "./Navigation.module.css";
import OutlineButton from "../Button/OutlineButton";

function Navigation() {
  return (
    <div className={styles.wrapper}>
      <div>
        <a href="#home">
          <strong>Stephanie</strong>and<strong>Joel</strong>
        </a>
      </div>
      <div className={styles.navLinkList}>
        <ul>
          <li>
            <a href="#schedule">Schedule</a>
          </li>
          <li>
            <a href="#">How to get there</a>
          </li>
          <li>
            <a href="#">Bridal party</a>
          </li>
          <li>
            <a href="#">Registry</a>
          </li>
          <li>
            <OutlineButton>RSVP</OutlineButton>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
