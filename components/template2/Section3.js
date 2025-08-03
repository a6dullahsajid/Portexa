import React from 'react'
import styles from "./template2.module.css"
export default function Section3({ userDetails }) {
    return (
        <>
            <section id="section3" className={`${styles.section} ${styles.section3}`}>
                <h2>Experience</h2>
                {userDetails.experience.map((exp,index) => {
                    return <div key={index} className={styles.experienceContainer}>
                        <div className={styles.position}>{exp.position}</div>
                        <div className={styles.companyDetails}>{exp.company} | {exp.from} - {exp.to}</div>
                        <div className={styles.work}>{exp.work}</div>
                    </div>
                })}
            </section>
            <div className={styles.line}></div>
        </>
    )
}
