// components/NoData.jsx
import styles from "./NoData.module.css";
import Link from "next/link";

export default function NoData() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <span className={styles.emoji}>📝</span>
                <h1 className={styles.h1}>No Portfolio Found</h1>
                <p className={styles.p}>Looks like you haven&apos;t created your portfolio yet.</p>
                <Link href="/dashboard">
                    <button className={styles.button}>Create One</button>
                </Link>
            </div>
        </div>
    );
}
