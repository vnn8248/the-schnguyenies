import React from "react";
import styles from "../styles/Rsvp.module.css";

const AshevilleRsvp = () => {
    return (
        <div className={styles.containerIframe}>
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSeCywABJgl4OQAQc13Q6xagATLSHUOLtDVqB77dSz_94agvdA/viewform?embedded=true" 
                className={styles.responsiveIframe}
            >
                Loading…
            </iframe>
        </div>
    );
};

export default AshevilleRsvp;