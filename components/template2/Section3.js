import React from 'react'
import styles from "./template2.module.css"
export default function Section3({ userDetails }) {
    return (
        <>
            <section id="section3" className={`${styles.section} ${styles.section3}`}>
                <h2>Experience</h2>
                {userDetails.experience.slice().reverse().map((exp, index) => {
                    return <div key={index} className={styles.experienceContainer}>
                        <div className={styles.position}>{exp.position}</div>
                        <div className={styles.companyDetails}>{exp.company} | {exp.from} - {exp.to}</div>
                        <ul className={styles.work}>{exp.work.split(".")
                            .map((sentence, index) => sentence.trim())
                            .filter(sentence => sentence.length > 0)
                            .map((sentence, index) => (
                                <li key={index}>{sentence}.</li>
                            ))}
                        </ul>
                    </div>
                })}
            </section>
            <div className={styles.line}></div>
        </>
    )
}
