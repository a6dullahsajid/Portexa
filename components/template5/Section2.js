import React from 'react'
import styles from './template5.module.css'

export default function Section2({ userDetails }) {
    return (
        <>
        <section id='section2' className={styles.section2}>
            <h2 className={styles.h2}>
                About Me
                <span className={styles.titleUnderline}></span>
            </h2>
            <div className={styles.aboutContainer}>
                <div className={styles.aboutLeft}>
                    <img src={userDetails.profileImage} alt="Profile" className={styles.profileImage} />
                </div>
                <div className={styles.aboutRight}>
                    <div className={styles.aboutContent}>
                        <p className={styles.bioText}>{userDetails.bio}</p>
                        <h3>Key Skills</h3>
                        <div className={styles.skillContainer}>
                            {userDetails.skills.map((skill, index) => {
                                return <div key={index} className={styles.skillCard}>{skill}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className={styles.line}></div>
        </>
    )
}
