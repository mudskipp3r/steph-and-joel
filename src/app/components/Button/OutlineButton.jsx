import React from "react";
import styles from "./OutlineButton.module.css";

function OutlineButton({ children }) {

  return <div className={styles.wrapper}>{children}</div>;
}

export default OutlineButton;
