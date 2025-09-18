"use client";

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handlePortfolioClick = (e) => {
        e.preventDefault();
        setIsLoadingPortfolio(true);
        
        // Navigate programmatically
        const portfolioUrl = `/${session.user.email.split("@")[0]}`;
        router.push(portfolioUrl);
        
        // Reset loading state when component unmounts or after navigation
        // This will be handled by the page load
    };

    // Reset loading state when component unmounts (page navigation)
    useEffect(() => {
        return () => {
            setIsLoadingPortfolio(false);
        };
    }, []);

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <Image fill src="/logo.png" alt="Logo" className={styles.logoImg} />
                    </div>
                    Portexa
                </div>
            </Link>
            {session
                ?
                <div className='buttons'>
                    <div className={styles.dropdownContainer} ref={dropdownRef}>
                        <button className={styles.dropdownDefaultButton} onClick={() => setShowDropdown(!showDropdown)}>
                            {session.user.name.split(" ")[0]}
                            <svg className={`w-2.5 h-2.5 ms-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div className={`${styles.dropdown} ${showDropdown ? 'flex' : 'hidden'}`} >
                            <ul aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <img src={session.user.image} alt="user profile" className={styles.userProfile} />
                                    <span>{session.user.name}</span>
                                </li>
                                <li>
                                    <Link href={`/dashboard`}>
                                        <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                                        </svg>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <button type="button" onClick={handlePortfolioClick} disabled={isLoadingPortfolio}>
                                        {isLoadingPortfolio ? (
                                            <div className={styles.loadingSpinner}></div>
                                        ) : (
                                            <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                        <span>{isLoadingPortfolio ? 'Loading...' : 'View Portfolio'}</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" onClick={() => { signOut({ callbackUrl: "/dashboard" }) }}>
                                        <svg className={styles.dropdownIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <Link href="/login" className={styles.login}>
                    <button>Login</button>
                </Link>
            }
        </nav>

    )
}
