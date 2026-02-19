import React from 'react'
import styles from './template7.module.css';
import "./template7.css";

export default function Section2({ userDetails }) {
  return (
    <section id="section2" className={styles.section2}>
      <h2 className={styles.h2}>About me
        <div className={styles.underline}></div>
      </h2>
      <div className={styles.aboutContainer}>
        <p className={styles.description}>{userDetails.bio}</p>
        <a href={userDetails.resume} target="_blank">
          <button>Resume</button>
        </a>
      </div>
      <h3 className={styles.h3}>Skills-</h3>
      <div className={styles.skillContainer}>
        {userDetails.skills.map((skill, index) => {
          return <div className={styles.skill} key={index}>&#8227; {skill}</div>
        })}
      </div>
    </section>
  )
}
