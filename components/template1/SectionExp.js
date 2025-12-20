import React from 'react'
import styles from "./template1.module.css";
export default function SectionExp({ userDetails }) {
    return (
        <>
            {userDetails.experience.length !== 0 && <section id="sectionexp" className={`${styles.section} ${styles.section2}`}>
                <h2 className={styles.h2}>
                    Experience
                    <div className={styles.line}></div>
                </h2>
                {userDetails.experience.map((exp, index) => {
                    return <div key={index} className={styles.experienceContainer}>
                        <div className={styles.position}>{exp.position}</div>
                        <div className={styles.companyDetails}>{exp.company} | {exp.from} - {exp.to}</div>
                        <div className={styles.work}>{exp.work.split(".")
                            .map((sentence, index) => sentence.trim())
                            .filter(sentence => sentence.length > 0)
                            .map((sentence, index) => (
                                <li key={index}>{sentence}.</li>
                            ))}</div>
                    </div>
                })}
            </section>}
        </>
    )
}
