import React from 'react'
import styles from './template6.module.css'

export default function Section1({ userDetails }) {
    return (
        <>
        <section id="section1" className={styles.section1}>
            {userDetails.profileImage && <div className={styles.photo}>
                <img src={userDetails.profileImage} alt="profile" />
            </div>}
            <div className={styles.profession}>
                <div className={styles.hey}>Hello👋,</div>
                <div className={styles.name}><p>I'm</p> <span className={styles.nameText}>{userDetails.name}</span></div>
                <div className={styles.professionName}>A {userDetails.title}</div>
            </div>
        </section>
        <div className={styles.hline}></div>
        </>
    )
}
