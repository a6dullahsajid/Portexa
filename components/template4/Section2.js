import React from 'react'
import styles from './template4.module.css'

export default function Section2({ userDetails }) {
    return (
        <>
            <section id='section2' className={`${styles.section} ${styles.section2}`}>
                <h2 className={`${styles.h2} syne-font`}>About me</h2>
                <div className={styles.aboutContainer}>
                    <p className={`${styles.description} kumbh-sans-font`} >{userDetails.bio.split(".")
                                .map((sentence, index) => sentence.trim())
                                .filter(sentence => sentence.length > 0)
                                .map((sentence, index) => (<p key={index}>{sentence}.</p>))}</p>
                    <a href={userDetails.resume} target="_blank">
                        <button className={`${styles.resume} kumbh-sans-font`}>Resume</button>
                    </a>
                    <h3 className={`${styles.h3} syne-font`}>My Skills</h3>
                    <div className={styles.skillContainer}>
                        {userDetails.skills.map((skill, index) => {
                            return <div key={index} className={`${styles.skillCard} kumbh-sans-font`}>&#8227; {skill}</div>
                        })}
                    </div>
                </div>
            </section>
            <div className={styles.line}></div>
        </>
    )
}
