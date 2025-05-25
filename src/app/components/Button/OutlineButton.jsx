import React from "react";
import styles from "./OutlineButton.module.css";

function OutlineButton(props) {
  const { children, href } = props;
  return <a href={href} target="blank" className={styles.wrapper}>{children}</a>;
}

export default OutlineButton;
