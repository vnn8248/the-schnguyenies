import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "./modal";
import styles from "../styles/Message.module.css";

const Message = ({ context }) => {
    const { heading, subheading, excerpt } = context;

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.content}>
                <div className="">
                    <h1 className={styles.heading}>{heading}</h1>
                    <h2 className={styles.subheading}>{subheading}</h2>
                </div>
                <p className={styles.excerpt}>{excerpt}</p>
                <Button variant="warning" onClick={() => setModalShow(true)}>Read More</Button>
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    messagedetails={context}
                />

            </div>
        </div>
    )
};

export default Message;