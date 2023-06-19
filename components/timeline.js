import { useState } from "react";
import styles from '../styles/Timeline.module.css';
import Button from "react-bootstrap/Button";
import Modal from "./modal";
import ReactMarkdown from "react-markdown";

const Timeline = ({ events, pastEventPhotos }) => {

    const [modalShow, setModalShow] = useState(false);
    const [location, setLocation] = useState(null);
    const [photos, setPhotos] = useState([]);


    return (
        <div className={`container ${styles.container}`}>
            <h2 className={styles.heading}>Our Plan</h2>
            <div className={styles.timeline}>

            {events.map((e, i) => {

                const eventState = (new Date(e.date)).getTime() < Date.now() ? styles.past : styles.future;

                const eventPhotos = pastEventPhotos.map(i => {
                    if (i.attributes.location === e.location) {
                        return i;
                    }
                }).filter((element) => {
                    return element !== undefined;
                });

                // White Sands album sharing
                // Google photos sharing link
                if (i === 1) {
                    return (
                        <div key={i} className={`${styles.box} ${styles.left} ${eventState}`}>
                            <div className={styles.content}>
                                <h2>{e.location}</h2>
                                <h3>{e.date}</h3>
                                <ReactMarkdown>{e.description}</ReactMarkdown>
                                <Button className={styles.button}>
                                    <a href={process.env.GOOGLE_PHOTOS} target='_blank'>
                                        Pictures!
                                    </a>
                                </Button>
                            </div>
                        </div>
                    )
                }


                // Even IDs are on the left side of the timeline
                if (i === 0 || i % 2 == 0) {    

                    // Past events will show a button and modal for pictures
                    if (eventState === styles.past) {
                        return (
                        <div key={i} className={`${styles.box} ${styles.right} ${eventState}`}>
                            <div className={styles.content}>
                                <h2>{e.location}</h2>
                                <h3>{e.date}</h3>
                                <ReactMarkdown>{e.description}</ReactMarkdown>
                                <Button 
                                className={styles.button} 
                                onClick={() => {
                                    setModalShow(true); 
                                    setLocation(e.location); 
                                    setPhotos(eventPhotos)
                                }}>
                                    Pictures!
                                </Button>
                                <Modal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    pastevent="true"
                                    pasteventphotos={photos}
                                    location={location}
                                />
                            </div>
                        </div>
                        )
                    } else {
                        return (
                            <div key={i} className={`${styles.box} ${styles.right} ${eventState}`}>
                                <div className={styles.content}>
                                    <h2>{e.location}</h2>
                                    <h3>{e.date}</h3>
                                    <ReactMarkdown>{e.description}</ReactMarkdown>
                                </div>
                            </div>
                        )
                    }
                } else {
                    // Odd IDs are on the right side of the timeline
                    // Past events will show a button and modal for pictures
                    if (eventState === styles.past && i !== 1) {
                        return (
                            <div key={i} className={`${styles.box} ${styles.left} ${eventState}`}>
                                <div className={styles.content}>
                                    <h2>{e.location}</h2>
                                    <h3>{e.date}</h3>
                                    <ReactMarkdown>{e.description}</ReactMarkdown>
                                    <Button className={styles.button} onClick={() => setModalShow(true)}>Pictures!</Button>
                                    <Modal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        pastevent="true"
                                        pasteventphotos={eventPhotos}
                                    />
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={i} className={`${styles.box} ${styles.left} ${eventState}`}>
                                <div className={styles.content}>
                                    <h2>{e.location}</h2>
                                    <h3>{e.date}</h3>
                                    <ReactMarkdown>{e.description}</ReactMarkdown>
                                </div>
                            </div>
                        )
                    }
                }
            })}
            </div> 
        </div>
    )
};

export default Timeline;