import React from 'react'
import styles from "./HowtoUseSection.module.css";

export default function HowtoUseSection() {
  return (
    <section id='howto' className={styles.howtoUseSection}>
      <h1 className={styles.howtoUseTitle}>How to Build <b>Portfolio</b> in <b>Portexa</b></h1>
      <div className={styles.howtoUseContainer}>
        <p>1</p>
        <div className={styles.howtoUseLine}></div>
        <p>2</p>
        <div className={styles.howtoUseLine}></div>
        <p>3</p>
      </div>
      <div className={styles.howtoUseCards}>
        <div className={styles.howtoUseCard}>
          <h2>Step 1</h2>
          <h3>Select a template</h3>
        </div>
        <div className={styles.howtoUseCard}>
          <h2>Step 2</h2>
          <h3>Customize your content</h3>
        </div>
        <div className={styles.howtoUseCard}>
          <h2>Step 3</h2>
          <h3>Publish your portfolio</h3>
        </div>
      </div>
    </section>
  )
}
