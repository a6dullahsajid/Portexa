import React from 'react'
import styles from './template7.module.css';
import "./template7.css";
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ details }) {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="#section1">
                        <img src="/template7/home.svg" alt="home" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="#section2">
                        <img src="/template7/about.svg" alt="about" />
                        About
                    </Link>
                </li>
                {details.experience?.length > 0 && <li>
                    <Link href="#section3">
                        <img src="/template7/experience.svg" alt="experience" />
                        Experience
                    </Link>
                </li>}
                <li>
                    <Link href="#section4">
                        <img src="/template7/project.svg" alt="project" />
                        Projects
                    </Link>
                </li>
                <li>
                    <Link href="#section5">
                        <img src="/template7/contact.svg" alt="contact" />
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
