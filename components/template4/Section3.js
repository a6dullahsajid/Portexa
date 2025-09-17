import React from 'react'
import styles from "./template4.module.css"

export default function Section3({ userDetails }) {
    return (
        <>
            <section id="section3" className={`${styles.section} ${styles.section3}`}>
                <h2 className={`${styles.h2} syne-font`}>Experience</h2>
                {userDetails.experience.slice().reverse().map((exp, index) => {
                    return <div key={index} className={styles.experienceWrapper}>
                        <div className={styles.vLine}>
                            <div className={styles.vLineDot}></div>
                        </div>
                        <div key={index} className={`${styles.experienceContainer} kumbh-sans-font`}>
                            <div className={styles.position}>{exp.position}</div>
                            <div className={styles.companyDetails}>{exp.company}</div>
                            <div className={styles.companyDuration}>{exp.from} - {exp.to}</div>
                            <ul className={styles.work}>{exp.work.split(".")
                                .map((sentence, index) => sentence.trim())
                                .filter(sentence => sentence.length > 0)
                                .map((sentence, index) => (
                                    <li key={index}>&#8227; {sentence}.</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                })}
            </section>
            <div className={styles.line}></div>
        </>
    )
}
