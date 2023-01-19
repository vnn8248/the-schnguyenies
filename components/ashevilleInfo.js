import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "../styles/AshevilleInfo.module.css";

const AshevilleInfo = ({ ashInfo }) => {
    return (
        <div className={`container ${styles.container}`}>
            <div className="heading">
                <h1>{ashInfo.data.attributes.heading}</h1>
                <h2>{ashInfo.data.attributes.subheading}</h2>
            </div>
            <div className="">
                <ReactMarkdown>{ashInfo.data.attributes.info}</ReactMarkdown>
            </div>
        </div>

    );
};

export default AshevilleInfo;