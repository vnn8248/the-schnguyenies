import React from 'react';
import styles from "../styles/Countdown.module.css";

const DateTimeDisplay = ({ value, type }) => {
  return (
    <div className={styles.countdown}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
