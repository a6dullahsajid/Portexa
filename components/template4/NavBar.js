"use client";
import React, { useState, useEffect } from 'react'
import styles from "./template4.module.css";

export default function NavBar({ details }) {
    const [activeSection, setActiveSection] = useState('section1');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
            const scrollPosition = window.scrollY + 100; // Offset for better detection

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [burgerOpen, setburgerOpen] = useState(false);

    return (
        <>
            <div className={styles.header + " kumbh-sans-font"}>
                <a href="#section1" className={styles.logo + " dancing-script-font"}>
                    {details.name[0]}
                </a>
                <div className={styles.burger} onClick={() => setburgerOpen(!burgerOpen)}>
                    {burgerOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 6L6 18M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 5h16M4 12h16M4 19h16"
                            />
                        </svg>
                    )}
                </div>
                <nav className={styles.nav}>
                    <div className={styles.menuContainer}>
                        <a
                            href="#section1"
                            className={activeSection === 'section1' ? styles.activeNav : ''}
                        >
                            Home
                        </a>
                    </div>
                    <div className={styles.menuContainer}>
                        <a
                            href="#section2"
                            className={activeSection === 'section2' ? styles.activeNav : ''}
                        >
                            About
                        </a>
                    </div>
                    {details.experience.length !== 0 && <div className={styles.menuContainer}>
                        <a
                            href="#section3"
                            className={activeSection === 'section3' ? styles.activeNav : ''}
                        >
                            Experience
                        </a>
                    </div>}
                    <div className={styles.menuContainer}>
                        <a
                            href="#section4"
                            className={activeSection === 'section4' ? styles.activeNav : ''}
                        >
                            Projects
                        </a>
                    </div>
                    <div className={styles.menuContainer}>
                        <a
                            href="#section5"
                            className={activeSection === 'section5' ? styles.activeNav : ''}
                        >
                            Contact
                        </a>
                    </div>
                </nav >
                <div className={styles.contactLinks}>
                    <a href={details.linkedin} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--hugeicons" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round"><path strokeLinecap="round" strokeWidth="1.5" d="M7 10v7m4-4v4m0-4a3 3 0 1 1 6 0v4m-6-4v-3"></path><path strokeLinecap="round" strokeWidth="2" d="M7.008 7h-.009"></path><path strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"></path></g></svg>
                    </a>
                    <a href={details.github} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--hugeicons" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568"></path><path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22"></path></g></svg>
                    </a>
                    <a href={details.x} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--akar-icons" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z"></path></svg>
                    </a>
                </div>
            </div >

            <div className={styles.dropdown} style={{ display: burgerOpen ? 'flex' : 'none' }}>
                <div className={styles.dropdownNav}>
                    <a
                        href="#section1"
                        className={activeSection === 'section1' ? styles.activeNav : ''}
                    >
                        Home
                    </a>

                    <a
                        href="#section2"
                        className={activeSection === 'section2' ? styles.activeNav : ''}
                    >
                        About
                    </a>

                    {details.experience.length !== 0 && <a href="#section3" className={activeSection === 'section3' ? styles.activeNav : ''} >
                        Experience
                    </a>
                    }
                    <a href="#section4" className={activeSection === 'section4' ? styles.activeNav : ''} >
                        Projects
                    </a>

                    <a href="#section5" className={activeSection === 'section5' ? styles.activeNav : ''} >
                        Contact
                    </a>
                </div>
                <div className={styles.dropdownContactLinks}>
                    <a href={details.linkedin} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--hugeicons" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round"><path strokeLinecap="round" strokeWidth="1.5" d="M7 10v7m4-4v4m0-4a3 3 0 1 1 6 0v4m-6-4v-3"></path><path strokeLinecap="round" strokeWidth="2" d="M7.008 7h-.009"></path><path strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"></path></g></svg>
                    </a>
                    <a href={details.github} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--hugeicons" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568"></path><path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22"></path></g></svg>
                    </a>

                    <a href={details.x} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--akar-icons" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z"></path></svg>
                    </a>
                </div>
            </div >
        </>
    )
}
