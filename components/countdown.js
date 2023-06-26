import React from "react";
import DateTimeDisplay from "./dateTimeDisplay";
import { useCountdown } from "../lib/hooks/useCountdown";
import styles from "../styles/Countdown.module.css";


const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className={styles.showCounter}>
        <div className={styles.countdownContainer}>
          <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
      </div>
    );
  };  

const Countdown = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
  
    return (
      <div className={`${styles.container}`}>
        <div className={styles.wrapper}>
          <h2 className={styles.nextEvent}>
            Washington D.C.
          </h2>
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
      </div>
    );
  };

export default Countdown;