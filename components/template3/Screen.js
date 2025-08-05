import React from 'react'
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import styles from "./template3.module.css";

export default function Screen({ userDetails }) {
    return (
        <div className={styles.screen}>
            <div className={styles.left}>
                <div className={styles.socialIcons}>
                    <a href={userDetails.github}>
                        <img src="/template1/github_logo.png" target="_blank" alt="" />
                    </a>
                    <a href={userDetails.x}>
                        <img src="/template1/x_logo.png" target="_blank" alt="" />
                    </a>
                    <a href={userDetails.github}>
                        <img src="/template1/linkedin.png" target="_blank" alt="" />
                    </a>
                </div>
                <div className={styles.vline}></div>
            </div>
            <main className={styles.main}>
                <Section1 userDetails={userDetails} />
                <Section2 userDetails={userDetails} />
                <Section3 userDetails={userDetails} />
                <Section4 userDetails={userDetails} />
                <Section5 userDetails={userDetails} />
            </main>
            <div className={styles.right}>
                <a href={`mailto:${userDetails.email}`} target='_blank' className={styles.rightMail}>{userDetails.email}</a>
                <div className={styles.vline}></div>
            </div>
        </div>
    )
}
