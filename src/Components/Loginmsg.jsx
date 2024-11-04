import React from "react";
import styles from "./Loginmsg.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Loginmsg() {
  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.successfull}>
          Sign-up successful <FontAwesomeIcon icon={faCircleCheck} />
        </h1>
        <h2 className={styles.welcome}>Welcome</h2>
        <h2 className={styles.to}>To</h2>
        <p className={styles.app}>" Super app "</p>
        <p className={styles.redirect}>
          Choose Your Favorite Movie Categories In Next Page
        </p>
      </div>
    </div>
  );
}
