"use client";

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);
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
                    <div className={styles.dropdownContainer}>
                        <button className={styles.dropdownDefaultButton} onClick={() => setShowDropdown(!showDropdown)}>
                            {session.user.name.split(" ")[0]}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div className={`${styles.dropdown} ${showDropdown ? 'flex' : 'hidden'}`} >
                            <ul aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <img src={session.user.image} alt="user profile" className={styles.userProfile} />{session.user.name}
                                </li>
                                <li>
                                    <Link href={`/dashboard`}>
                                        <button>Dashboard</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.email.split("@")[0]}`}>
                                        <button>View Portfolio</button>
                                    </Link>
                                </li>
                                <li>
                                    <button type="button" onClick={() => { signOut({ callbackUrl: "/dashboard" }) }}>Logout</button>
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
