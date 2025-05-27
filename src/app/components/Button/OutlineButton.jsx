import React from "react";
import styles from "./OutlineButton.module.css";

function OutlineButton(props) {
  const { children, href, onClick } = props;
  
  const handleClick = (e) => {
    if (onClick) {
      if (!href) {
        e.preventDefault(); // Prevent default only if no href
      }
      onClick();
    }
  };
  
  return (
    <a 
      onClick={handleClick}
      href={href || "#"} 
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={styles.wrapper}
    >
      {children}
    </a>
  );
}

export default OutlineButton;