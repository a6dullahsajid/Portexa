import React from 'react'
import styles from "./template3.module.css";

export default function Section1({userDetails}) {
  return (
    <section id="section1" className={`${styles.section} ${styles.section1}`}>
      <h1 className={styles.hi}>Hi, my name is</h1>
      <h2 className={styles.name}>{userDetails.name}</h2>
      <h3 className={styles.profName}>I&apos;m a {userDetails.title}.</h3>
      <a href={userDetails.resume} target='_blank'>
        <button className={styles.resume}>Resume</button>
      </a>
    </section>
  )
}
