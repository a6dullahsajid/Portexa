import React from 'react'
import styles from './template5.module.css'

export default function Section1({userDetails}) {
  return (
    <section id="section1" className={styles.section1}>
        <div className={styles.profession}>
            <div className={styles.name}>
                <p>{userDetails.name}</p>
            </div>
            <div className={styles.profession}>
                <p>A {userDetails.title}</p>
            </div>
            <a href={userDetails.resume} target='_blank'>
                <button className={styles.resume}>Resume</button>
            </a>
        </div>
    </section>
  )
}
