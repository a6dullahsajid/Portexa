import React from 'react'
import styles from "./template3.module.css";

export default function Section5({ userDetails }) {
    return (
        <section id="section5" className={`${styles.section} ${styles.section5}`}>
            <div className={styles.heading}>
                <h4>Get in Touch</h4>
            </div>
            <div className={styles.connectContainer}>
                <div className={styles.connectContent}>
                    {userDetails.connectDesc}
                </div>
                {userDetails.email && <div>Email:{userDetails.email}</div>}
                {userDetails.email && <a href={`mailto:${userDetails.email}`}>
                    <button className={styles.helloBtn}>
                        Say Hello
                    </button>
                </a>}
            </div>
        </section>
    )
}
