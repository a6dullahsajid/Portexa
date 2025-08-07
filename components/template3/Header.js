"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import styles from "./template3.module.css";

export default function Header({ experience, image, resume }) {
    const [burgerOpen, setBurgerOpen] = useState(false);
    function handleClose() {
        setBurgerOpen(false);
        if (!burgerOpen) {
            document.getElementsByClassName("burger")[0].style.display = "block";
        }
    }
    function handleOpen() {
        setBurgerOpen(true)
        if (burgerOpen) {
            document.getElementsByClassName("burger")[0].style.display = "none";
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <img src={image} alt="logo" />
                <span>Portfolio</span>
            </div>
            <div className={`headerRight`}>
                <ul>
                    <li>
                        <a href="#section1">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#section2">
                            About
                        </a>
                    </li>
                    {experience.length !== 0 && <li>
                        <a href="#section3">
                            Experience
                        </a>
                    </li>
                    }
                    <li>
                        <a href="#section4">
                            Work
                        </a>
                    </li>
                    <li>
                        <a href="#section5">
                            Contact
                        </a>
                    </li>
                </ul>
                <a href={resume} target='_blank'>
                    <button className={styles.resume}>Resume</button>
                </a>
            </div>
            <div className={styles.card} style={{ right: burgerOpen ? "0" : "-60%" }}>
                <span className={styles.close} onClick={handleClose}>X</span>
                <ul>
                    <li>
                        <a href="#section1">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#section2">
                            About
                        </a>
                    </li>
                    {experience.length !== 0 && <li>
                        <a href="#section3">
                            Experience
                        </a>
                    </li>
                    }
                    <li>
                        <a href="#section4">
                            Work
                        </a>
                    </li>
                    <li>
                        <a href="#section5">
                            Contact
                        </a>
                    </li>
                </ul>
                <a href={resume} target='_blank'>
                    <button className={styles.resume}>Resume</button>
                </a>
            </div>
            <div className="burger" >
                <img src="/template3/burger.svg" alt="burg" onClick={handleOpen} />
            </div>
        </div>
    )
}
