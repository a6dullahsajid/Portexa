import React from 'react'
import styles from "./template3.module.css";

export default function Section2({ userDetails }) {
  return (
    <section id="section2" className={`${styles.section} ${styles.section2}`}>
      <div className={styles.heading}>
        <h4>About Me</h4>
        <div className={styles.hline}></div>
      </div>
      <div className={styles.content}>
        <img  className={styles.profileImg} src={userDetails.profileImage} alt="Profile" />
        <div className={styles.aboutBio}>
          <div>{userDetails.bio}</div>
          <div>Here are few technologies I&apos;ve been working with recently:</div>
          <ul className={styles.skillList}>
            {userDetails.skills.map((skill, index) => {
              return <li key={index}>
                {skill}
              </li>
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
