import React from "react";
import styles from "./Footer.module.scss";
const Footer = () => {
    return (
        <footer>
            <h3 className={styles.h3}>Hacker News</h3>
            <div>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    href="https://github.com/homie43"
                >
                    homie43 production
                </a>
            </div>
        </footer>
    );
};

export default Footer;
