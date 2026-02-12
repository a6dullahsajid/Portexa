import React from 'react'
import styles from './template6.module.css'

export default function Section2({ userDetails }) {
    return (
        <>
            <section id="section2" className={styles.section2}>
                <h2 className={styles.h2}>About me</h2>
                <div className={styles.aboutContainer}>
                    <div className={styles.aboutLeft}>
                        <p className={styles.description}>{userDetails.bio}</p>
                        <a href={userDetails.resume} target="_blank">
                            <button className={styles.resume}>Resume</button>
                        </a>
                    </div>
                    <div className={styles.aboutRight}>
                        <h3 className={styles.h3}>Skill-Set</h3>
                        <div className={styles.skillsContainer}>
                            {userDetails.skills.map((skill, index) => {
                                return <div key={index} className={styles.skill}>{skill}</div>
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles.hline}></div>
        </>
    )
}
