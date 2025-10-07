import React from 'react'
import styles from './template5.module.css'

export default function Section3({ userDetails }) {
  return (
    <>
      <section id='section3' className={styles.section3}>
        <h2 className={styles.h2}>
          Experience
          <span className={styles.titleUnderline}></span>
        </h2>
        <div className={styles.experienceContainer}>
          {userDetails.experience.slice().reverse().map((exp, index) => {
            return <div key={index} className={styles.experienceWrapper}> <div className={styles.vLine}>
                            <div className={styles.vLineDot}></div>
                        </div>
            <div className={styles.experienceDetails}>
              <div className={styles.experienceTitle}>{exp.position}</div>
              <div className={styles.experienceCompany}>{exp.company}</div>
              <div className={styles.experienceDuration}>{exp.from} - {exp.to}</div>
              <div className={styles.experienceDescription}>
                {exp.work.split('.').filter(sentence => sentence.trim()).map((sentence, sentenceIndex) => (
                  <div key={sentenceIndex} className={styles.bulletPoint}>
                    • {sentence.trim()}.
                  </div>
                ))}
              </div>
            </div>
            </div>
          })}
        </div>
      </section>

      <div className={styles.line}></div>
    </>
  )
}
