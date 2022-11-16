import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
const Header = () => {
    return (
        <header>
            <h1>HACKER NEWS</h1>
            <Link to="/" className={styles.root}>
                POSTS
            </Link>
        </header>
    );
};

export default Header;
