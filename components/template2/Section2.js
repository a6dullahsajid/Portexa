import React from 'react'
import styles from "./template2.module.css";

export default function Section2({ userDetails }) {
    return (
        <>
            <section id='section2' className={`${styles.section} ${styles.section2}`}>
                <h2 className={styles.h2}>About me</h2>
                <div className={styles.aboutContainer}>
                    <p className={styles.description}>{userDetails.bio}</p>
                    <a href={userDetails.resume} target="_blank">
                        <button className={styles.resume}>Resume</button>
                    </a>
                    <h3>Key Skills</h3>
                    <div className={styles.skillContainer}>
                        {userDetails.skills.map((skill, index) => {
                            return <div key={index} className={styles.skillCard}>{skill}</div>
                        })}
                    </div>
                </div>
            </section>
            <div className={styles.line}></div>
        </>
    )
}
