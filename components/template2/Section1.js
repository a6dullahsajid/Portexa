import React from 'react'
import styles from './template2.module.css'

export default function Section1({userDetails}) {
    return (
        <>
            <section id='section1' className={`${styles.section} ${styles.section1}`}>
                <div className={styles.profession}>
                    <div className={styles.name}>{userDetails.name}</div>
                    <div className={styles.profname}>{userDetails.title}</div>
                </div>
                {userDetails.profileImage && <div className={styles.photo}>
                    <img src={userDetails.profileImage} alt="" />
                </div>}
            </section>
            <div className={styles.line}></div>
        </>
    )
}
