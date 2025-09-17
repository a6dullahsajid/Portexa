import React from 'react'
import styles from './template4.module.css'

export default function Section1({userDetails}) {
    return (
        <>
            <section id='section1' className={`${styles.section} ${styles.section1} kumbh-sans-font`}>
                <div className={styles.profession}>
                    <div className={styles.hey}>Hey, there👋</div>
                    <div className={styles.name}><p>I'm</p>{userDetails.name}</div>
                    <div className={styles.profname}>a {userDetails.title}</div>
                </div>
                <div className={styles.photo}>
                    <img src={userDetails.profileImage} alt="" />
                </div>
            </section>
            <div className={styles.line}></div>
        </>
    )
}
