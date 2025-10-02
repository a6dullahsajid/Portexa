import Link from "next/link"
import styles from "./homeNav.module.css";
import Image from "next/image";
import StartButton from "../StartButton";

export default function HomeNav() {
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
            <ul>
                <li><Link href="#hero">Home</Link></li>
                <li><Link href="#why">About</Link></li>
                <li><Link href="#faq">FAQ</Link></li>
            </ul>
            <Link href="/dashboard" className={styles.login}>
                <StartButton text="Get Started" />
            </Link>
        </nav>

    )
}
