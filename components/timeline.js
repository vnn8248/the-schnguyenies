import React from "react";
import styles from '../styles/Timeline.module.css';
import Button from "react-bootstrap/Button";
import Modal from "./modal";
import ReactMarkdown from "react-markdown";

const Timeline = ({ events, pastEventPhotos }) => {

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className={`container ${styles.container}`}>
            <h2 className={styles.heading}>Our Plan</h2>
            <div className={styles.timeline}>

            {events.map((e, i) => {

                const eventState = (new Date(e.date)).getTime() < Date.now() ? styles.past : styles.future;

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
                                <Button className={styles.button} onClick={() => setModalShow(true)}>Pictures!</Button>
                                <Modal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    pastevent="true"
                                    pasteventphotos={pastEventPhotos}
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
                    if (eventState === styles.past) {
                        return (
                            <div key={i} className={`${styles.box} ${styles.left} ${eventState}`}>
                                <div className={styles.content}>
                                    <h2>{e.location}</h2>
                                    <h3>{e.date}</h3>
                                    <ReactMarkdown>{e.description}</ReactMarkdown>
                                    <Button onClick={() => setModalShow(true)}>Pictures!</Button>
                                    <Modal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        pastevent="true"
                                        pasteventphotos={pastEventPhotos}
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