import React from 'react'
import styles from './template7.module.css';
import "./template7.css";

export default function Section1({ userDetails }) {
  return (
    <>
      <section id='section1' className={`${styles.section} ${styles.section1} kumbh-sans-font`}>
        <div className={styles.photo}>
          <img src={userDetails.profileImage} alt="" />
        </div>
        <div className={styles.profession}>
          <div className={styles.hey}>Hey,</div>
          <div className={styles.name}><p>I'm</p><span>{userDetails.name}</span></div>
          <div className={styles.profname}>A {userDetails.title}</div>
        </div>
      </section>
    </>
  )
}
