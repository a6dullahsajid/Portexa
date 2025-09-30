import React from 'react'
import styles from "./howtoUseSection.module.css";

export default function HowtoUseSection() {
  return (
    <section className={styles.howtoUseSection}>
      <h1 className={styles.howtoUseTitle}>How to Use Portexa</h1>
      <div className={styles.howtoUseContainer}>
        <div className={styles.howtoUseCard}>
          <p>Select a template</p>
          <h2>Step 1</h2>
        </div>
        <div className={styles.howtoUseLine}></div>
        <div className={styles.howtoUseCard}>
          <p>Customize your content</p>
          <h2>Step 2</h2>
        </div>
        <div className={styles.howtoUseLine}></div>
        <div className={styles.howtoUseCard}>
          <p>Publish your portfolio</p>
          <h2>Step 3</h2>
        </div>
      </div>
    </section>
  )
}
