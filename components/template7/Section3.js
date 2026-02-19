import React from 'react'
import styles from './template7.module.css';
import "./template7.css";

export default function Section3({ userDetails }) {
  return (
    <section id="section3" className={styles.section3}>
      <h2 className={styles.h2}>Experience
        <div className={styles.underline}></div>
      </h2>
      <div className={styles.experienceContainer}>
        {userDetails.experience.map((experience, index) => {
          return <div key={index} className={styles.experienceWrapper}>
            <div className={styles.vLine}>
              <div className={styles.vLineDot}></div>
            </div>
            <div className={styles.experience} key={index}>
              <h3 className={styles.position}>{experience.position}</h3>
              <h4 className={styles.company}>{experience.company}</h4>
              <p className={styles.duration}>{experience.from} - {experience.to}</p>
              <ul className={styles.work}>
                {experience.work.split(".")
                  .map((sentence, index) => sentence.trim())
                  .filter(sentence => sentence.length > 0)
                  .map((sentence, index) => (
                    <li key={index}>&#8227; {sentence}.</li>
                  ))}
              </ul>
            </div>
          </div>
        })}
      </div>
    </section>
  )
}
