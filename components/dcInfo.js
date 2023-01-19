import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "../styles/DcInfo.module.css";

const DcInfo = ({ dcInfo }) => {
    return (
        <div className={`container ${styles.container}`}>
            <div className="heading">
                <h1>{dcInfo.data.attributes.heading}</h1>
                <h2>{dcInfo.data.attributes.subheading}</h2>
            </div>
            <div className="">
                <ReactMarkdown>{dcInfo.data.attributes.info}</ReactMarkdown>
            </div>
        </div>

    );
};

export default DcInfo;