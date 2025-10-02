"use client";
import Link from "next/link"
import styles from "./homeNav.module.css";
import Image from "next/image";
import StartButton from "../StartButton";
import { useState } from "react";

export default function HomeNav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={styles.nav}>
            <Link href="#hero">
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <Image fill src="/logo.png" alt="Logo" className={styles.logoImg} />
                    </div>
                    Portexa
                </div>
            </Link>
            
            {/* Desktop Navigation */}
            <ul className={styles.desktopNav}>
                <li><Link href="#hero">Home</Link></li>
                <li><Link href="#why">About</Link></li>
                <li><Link href="#faq">FAQ</Link></li>
            </ul>
            
            {/* Desktop Login Button */}
            <Link href="/dashboard" className={styles.desktopLogin}>
                <StartButton text="Get Started" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button className={styles.hamburger} onClick={toggleMenu}>
                <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
                <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
            </button>

            {/* Mobile Dropdown Menu */}
            <div className={`${styles.mobileDropdown} ${isMenuOpen ? styles.mobileDropdownOpen : ''}`}>
                <ul className={styles.mobileNav}>
                    <li><Link href="#hero" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link href="#why" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                    <li><Link href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link></li>
                </ul>
                <div className={styles.mobileLogin}>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <StartButton text="Get Started" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}
