import React from "react";
import styles from "../styles/Rsvp.module.css";

const DcRsvp = () => {
    return (
        <div className={styles.containerIframe}>
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSfZ1wjzfRX8cgovP3AsV8QqWEuYNT3vBn4UslWy1rBMxzfLrA/viewform?embedded=true" 
                className={styles.responsiveIframe}
            >
                Loading…
            </iframe>
        </div>
    );
};

export default DcRsvp;